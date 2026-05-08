import { Logger } from '@nestjs/common'
import { config } from 'dotenv'
import { NodeCryptoAdapter } from '~/shared/infra/crypto/node-crypto.adapter'
import { tenantManagerDatabaseConfig } from '~/shared/infra/database/typeorm/config/database.config'
import { TenantTypeormDataMapper } from '~/shared/infra/database/typeorm/tenant-manager/data-mappers'
import { TypeormDatabaseAdapter } from '~/shared/infra/database/typeorm/typeorm-database.adapter'

config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
})

export const seed = async () => {
  const logger = new Logger()
  const publicConnection = new TypeormDatabaseAdapter({
    config: { ...tenantManagerDatabaseConfig, logging: false },
  })
  await publicConnection.connect()
  const connection = publicConnection.getConnection()
  await connection.runMigrations()
  const crypto = new NodeCryptoAdapter({
    secretKey: process.env.CRYPTO_SECRET_KEY!,
    iv: process.env.CRYPTO_IV_KEY!,
  })
  // always update localdev tenant to have same credentials from .env
  await connection.getRepository(TenantTypeormDataMapper).update(
    {
      id: '7bb440f0-0f3a-46e3-8d1a-2b83ff64d65d',
    },
    {
      databaseName: process.env.DB_NAME!,
      databaseHost: process.env.DB_HOST!,
      databasePassword: crypto.encrypt(process.env.DB_PASS!),
      databaseUsername: process.env.DB_USER!,
      databasePort: Number(process.env.DB_PORT!),
      databaseSchema: process.env.DB_SCHEMA!,
    },
  )
  const tenants = await connection.getRepository(TenantTypeormDataMapper).find()
  if (!tenants.length) {
    logger.debug('No tenants found')
    await publicConnection.disconnect()
    return
  }
  const publicConfig = connection.options as any
  await publicConnection.disconnect()

  for (const tenant of tenants) {
    try {
      if (tenant.blockedDate) {
        logger.debug(`Tenant ${tenant.name} is blocked`)
        logger.debug('Migration not executed')
        return
      }
      const tenantConnection = new TypeormDatabaseAdapter({
        config: {
          type: 'postgres',
          host: tenant.databaseHost,
          port: Number(tenant.databasePort),
          username: tenant.databaseUsername,
          password: crypto.decrypt(tenant.databasePassword),
          database: tenant.databaseName,
          schema: tenant.databaseSchema,
          migrations: [`${__dirname}/../application/seed/*{.ts,.js}`],
          logging: process.env.DB_LOGGING === 'true',
        },
      })
      await tenantConnection.connect()
      const tenantConnectionInstance = tenantConnection.getConnection()
      tenantConnectionInstance
        .query(`CREATE SCHEMA IF NOT EXISTS ${tenant.databaseSchema}`)
        .then(() => {
          logger.debug(`Schema ${tenant.databaseSchema} created`)
        })
        .catch((_error) => {
          logger.debug(`Schema ${tenant.databaseSchema} already exists`)
        })
      await tenantConnectionInstance.query(
        `GRANT ALL PRIVILEGES ON SCHEMA ${tenant.databaseSchema} TO ${publicConfig.username};`,
      )
      await tenantConnectionInstance.runMigrations()
      await tenantConnectionInstance.destroy()
    } catch (error) {
      logger.error(`Error running migration for ${tenant.name}`)
      logger.error(error)
    }
  }
}

seed()
