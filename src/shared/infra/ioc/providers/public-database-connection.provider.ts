import { Provider } from '@nestjs/common'
import { IDatabase } from '~/shared/infra/contracts/database'
import { tenantManagerDatabaseConfig } from '~/shared/infra/database/typeorm/config/database.config'
import { TypeormDatabaseAdapter } from '~/shared/infra/database/typeorm/typeorm-database.adapter'
import { SharedProviderEnum } from '~/shared/infra/ioc/shared-provider.enum'

export class PublicDatabaseConnectionProvider {
  static register(): Provider {
    return {
      provide: SharedProviderEnum.TENANT_MANAGER_DATABASE_CONNECTION,
      useFactory: async (): Promise<IDatabase> => {
        const database = new TypeormDatabaseAdapter({
          config: {
            ...tenantManagerDatabaseConfig,
          },
        })
        await database.connect()
        return database
      },
      inject: [],
    }
  }
}
