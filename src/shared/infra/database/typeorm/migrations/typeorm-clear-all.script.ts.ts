import { Logger } from '@nestjs/common'
import { config } from 'dotenv'
import { Environment } from '~/shared/infra/config/environment.enum'
import { tenantManagerDatabaseConfig } from '~/shared/infra/database/typeorm/config/database.config'
import { TypeormDatabaseAdapter } from '~/shared/infra/database/typeorm/typeorm-database.adapter'

if (![Environment.DEV.toString(), Environment.TEST.toString()].includes(`${process.env.NODE_ENV}`)) {
  throw new Error('This script should only be run in development or test environment')
}

config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
})

export const clearAll = async () => {
  const logger = new Logger()
  const publicConnection = new TypeormDatabaseAdapter({
    config: { ...tenantManagerDatabaseConfig, logging: false },
  })
  await publicConnection.connect()
  const connection = publicConnection.getConnection()
  const queryTest = `SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'`
  const tables = await connection.query(queryTest)
  if (tables.length === 0) {
    logger.debug('No tables found')
    await publicConnection.disconnect()
    return
  }
  const query = `select schema_name, t.slug, t.name, t.database_host,
    t.database_port, t.database_username, t.database_password, t.database_name, t.database_schema
    from information_schema.schemata sch
    inner join public.tenants t on t.slug = sch.schema_name
  `
  const tenants = await connection.query(query)

  if (!tenants.length) {
    logger.debug('No tenants found')
    await publicConnection.disconnect()
    return
  }
  for (const tenant of tenants) {
    try {
      const tenantConnection = new TypeormDatabaseAdapter({
        config: {
          type: 'postgres',
          host: tenant.database_host,
          port: Number(tenant.database_port),
          username: process.env.DB_USER,
          password: process.env.DB_PASS,
          database: tenant.database_name,
          schema: tenant.database_schema,
          migrations: [`${__dirname}/../application/migrations/*{.ts,.js}`],
          logging: process.env.DB_LOGGING === 'true',
        },
      })
      await tenantConnection.connect()
      const tenantConnectionInstance = tenantConnection.getConnection()
      await tenantConnectionInstance.dropDatabase()
      await tenantConnectionInstance.query(`DROP SCHEMA ${tenant.slug} CASCADE`)
      await tenantConnectionInstance.destroy()
    } catch (error) {
      logger.error(`Error running migration for ${tenant.name}`)
      logger.error(error)
    }
  }
  await connection.dropDatabase()
  await publicConnection.disconnect()
}

clearAll()
