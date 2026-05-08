import { Provider } from '@nestjs/common'
import { DataSource } from 'typeorm'
import { IUserRepository } from '~/shared/domain/repositories/tenant/user.repository'
import { IDatabase } from '~/shared/infra/contracts/database'
import { UserTypeormDataMapper } from '~/shared/infra/database/typeorm/application/data-mappers/user-typeorm.data-mapper'
import { UserTypeormMapper } from '~/shared/infra/database/typeorm/repositories/application/mappers/user-typeorm.mapper'
import { UserTypeormRepository } from '~/shared/infra/database/typeorm/repositories/application/user.typeorm.repository'
import { SharedProviderEnum } from '~/shared/infra/ioc/shared-provider.enum'

export class UserRepositoryProvider {
  static register(): Provider {
    return {
      provide: SharedProviderEnum.REPOSITORIES.USER_REPOSITORY,
      useFactory: async (tenantDatabase: IDatabase<DataSource>): Promise<IUserRepository> => {
        return new UserTypeormRepository(tenantDatabase.getConnection(), UserTypeormDataMapper, new UserTypeormMapper())
      },
      inject: [SharedProviderEnum.APPLICATION_DATABASE_CONNECTION],
    }
  }
}
