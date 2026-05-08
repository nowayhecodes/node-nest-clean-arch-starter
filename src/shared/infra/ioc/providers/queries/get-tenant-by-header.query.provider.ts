import { Provider } from '@nestjs/common'
import { DataSource } from 'typeorm'
import { IGetTenantByHeaderQuery } from '~/shared/application/queries/tenants'
import { IDatabase } from '~/shared/infra/contracts/database'
import { IFileSystem } from '~/shared/infra/contracts/file-system'
import { GetTenantByHeaderTypeormQuery } from '~/shared/infra/database/typeorm/queries/get-tenant-by-header-typeorm.query'
import { SharedProviderEnum } from '~/shared/infra/ioc/shared-provider.enum'

export class GetTenantByHeaderProvider {
  static register(): Provider {
    return {
      provide: SharedProviderEnum.QUERIES.GET_TENANT_BY_HEADER,
      useFactory: async (
        connection: IDatabase<DataSource>,
        publicFileSystem: IFileSystem,
      ): Promise<IGetTenantByHeaderQuery> => {
        return new GetTenantByHeaderTypeormQuery(connection, publicFileSystem)
      },
      inject: [SharedProviderEnum.TENANT_MANAGER_DATABASE_CONNECTION, SharedProviderEnum.PUBLIC_FILE_SYSTEM],
    }
  }
}
