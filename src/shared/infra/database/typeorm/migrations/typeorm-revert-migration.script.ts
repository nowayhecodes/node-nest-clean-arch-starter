import { Logger } from '@nestjs/common'
import { config } from 'dotenv'
import { NodeCryptoAdapter } from '~/shared/infra/crypto/node-crypto.adapter'
import { tenantManagerDatabaseConfig } from '~/shared/infra/database/typeorm/config/database.config'
import { TenantTypeormDataMapper } from '~/shared/infra/database/typeorm/tenant-manager/data-mappers'
import { TypeormDatabaseAdapter } from '~/shared/infra/database/typeorm/typeorm-database.adapter'

config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
})

export const migration = async () => {
  const logger = new Logger()
  const publicConnection = new TypeormDatabaseAdapter({
    config: { ...tenantManagerDatabaseConfig, logging: false },
  })
  await publicConnection.connect()
  const connection = publicConnection.getConnection()
  const tenants = await connection.getRepository(TenantTypeormDataMapper).find()
  if (!tenants.length) {
    logger.debug('No tenants found')
    await publicConnection.disconnect()
    return
  }
  await publicConnection.disconnect()
  const crypto = new NodeCryptoAdapter({
    secretKey: process.env.CRYPTO_SECRET_KEY!,
    iv: process.env.CRYPTO_IV_KEY!,
  })
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
          migrations: [`${__dirname}/../application/migrations/*{.ts,.js}`],
          logging: process.env.DB_LOGGING === 'true',
        },
      })
      await tenantConnection.connect()
      const tenantConnectionInstance = tenantConnection.getConnection()
      await tenantConnectionInstance.undoLastMigration()
      await tenantConnectionInstance.destroy()
    } catch (error) {
      logger.error(`Error running migration for ${tenant.name}`)
      logger.error(error)
    }
  }
}

migration()
