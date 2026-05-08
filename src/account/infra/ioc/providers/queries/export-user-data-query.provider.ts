import { DataSource } from 'typeorm'
import { Provider } from '@nestjs/common'
import { IExportUserDataQuery } from '~/account/application/queries'
import { ExportUserDataTypeormQuery } from '~/account/infra/database/typeorm/queries/export-user-data-typeorm.query'
import { AccountProviderEnum } from '~/account/infra/ioc/account.provider.enum'
import { IDatabase } from '~/shared/infra/contracts/database'
import { SharedProviderEnum } from '~/shared/infra/ioc/shared-provider.enum'

export class ExportUserDataQueryProvider {
  static register(): Provider {
    return {
      provide: AccountProviderEnum.QUERIES.EXPORT_USER_DATA,
      useFactory: (db: IDatabase<DataSource>): IExportUserDataQuery => new ExportUserDataTypeormQuery(db),
      inject: [SharedProviderEnum.APPLICATION_DATABASE_CONNECTION],
    }
  }
}
