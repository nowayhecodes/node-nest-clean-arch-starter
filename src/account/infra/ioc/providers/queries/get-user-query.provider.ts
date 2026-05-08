import { Provider } from '@nestjs/common'
import { DataSource } from 'typeorm'
import { IGetUserQuery } from '~/account/application/queries'
import { GetUserTypeormQuery } from '~/account/infra/database/typeorm/queries/get-user-typeorm.query'
import { AccountProviderEnum } from '~/account/infra/ioc/account.provider.enum'
import { IDatabase } from '~/shared/infra/contracts/database'
import { SharedProviderEnum } from '~/shared/infra/ioc/shared-provider.enum'

export class GetUserQueryProvider {
  static register(): Provider {
    return {
      provide: AccountProviderEnum.QUERIES.GET_USER,
      useFactory: async (connection: IDatabase<DataSource>): Promise<IGetUserQuery> => {
        return new GetUserTypeormQuery(connection)
      },
      inject: [SharedProviderEnum.APPLICATION_DATABASE_CONNECTION],
    }
  }
}
