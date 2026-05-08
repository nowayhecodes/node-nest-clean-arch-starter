import { Provider } from '@nestjs/common'
import { DataSource } from 'typeorm'
import { ITenantRepository } from '~/shared/domain/repositories/public/tenant.repository'
import { IDatabase } from '~/shared/infra/contracts/database'
import { TenantTypeormMapper } from '~/shared/infra/database/typeorm/repositories/tenant-manager/mappers'
import { TenantTypeormRepository } from '~/shared/infra/database/typeorm/repositories/tenant-manager/tenant-typeorm.repository'
import { TenantTypeormDataMapper } from '~/shared/infra/database/typeorm/tenant-manager/data-mappers'
import { SharedProviderEnum } from '~/shared/infra/ioc/shared-provider.enum'

export class TenantRepositoryProvider {
  static register(): Provider {
    return {
      provide: SharedProviderEnum.REPOSITORIES.TENANT_REPOSITORY,
      useFactory: async (tenantDatabase: IDatabase<DataSource>): Promise<ITenantRepository> => {
        return new TenantTypeormRepository(
          tenantDatabase.getConnection(),
          TenantTypeormDataMapper,
          new TenantTypeormMapper(),
        )
      },
      inject: [SharedProviderEnum.TENANT_MANAGER_DATABASE_CONNECTION],
    }
  }
}
