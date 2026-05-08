import { Provider } from '@nestjs/common'
import { DataSource } from 'typeorm'
import { IGetTenantByIdQuery } from '~/shared/application/queries/tenants/get-tenant-by-id.query'
import { IDatabase } from '~/shared/infra/contracts/database'
import { GetTenantByIdTypeormQuery } from '~/shared/infra/database/typeorm/queries/get-tenant-by-id-typeorm.query'
import { SharedProviderEnum } from '~/shared/infra/ioc/shared-provider.enum'

export class GetTenantByIdQueryProvider {
  static register(): Provider {
    return {
      provide: SharedProviderEnum.QUERIES.GET_TENANT_BY_ID,
      useFactory: async (connection: IDatabase<DataSource>): Promise<IGetTenantByIdQuery> => {
        return new GetTenantByIdTypeormQuery(connection)
      },
      inject: [SharedProviderEnum.TENANT_MANAGER_DATABASE_CONNECTION],
    }
  }
}
