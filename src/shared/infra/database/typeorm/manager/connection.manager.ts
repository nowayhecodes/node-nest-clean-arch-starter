import { DataSource, DataSourceOptions } from 'typeorm'
import { IGetTenantByIdQuery } from '~/shared/application/queries/tenants/get-tenant-by-id.query'
import { IDatabase } from '~/shared/infra/contracts/database'
import { applicationDatabaseConfig } from '~/shared/infra/database/typeorm/config/database.config'
import { TypeormDatabaseAdapter } from '~/shared/infra/database/typeorm/typeorm-database.adapter'

export class ConnectionManager {
  static instance: ConnectionManager

  connections = new Map<string, IDatabase<DataSource>>()

  private constructor() {}

  static getInstance() {
    if (!ConnectionManager.instance) {
      ConnectionManager.instance = new ConnectionManager()
    }
    return ConnectionManager.instance
  }

  async getConnection(tenant: IGetTenantByIdQuery.TenantDto) {
    let activeConnection = this.connections.get(tenant.id)
    if (activeConnection && activeConnection.getConnection()?.isInitialized) {
      return activeConnection
    }
    const databaseConnection = new TypeormDatabaseAdapter({
      config: {
        ...applicationDatabaseConfig,
        type: 'postgres',
        host: tenant.databaseHost,
        port: tenant.databasePort,
        username: tenant.databaseUsername,
        password: tenant.databasePassword,
        database: tenant.databaseName,
        schema: tenant.databaseSchema,
        applicationName: tenant.slug,
        name: tenant.slug,
      } as DataSourceOptions,
    })
    activeConnection = databaseConnection
    await activeConnection.connect()
    this.connections.set(tenant.id, activeConnection)
    return activeConnection
  }

  killConnection(connection: string) {
    this.connections.delete(connection)
  }

  async destroyAllConnections() {
    for (const connection of this.connections.values()) {
      await connection.disconnect()
    }
  }
}
