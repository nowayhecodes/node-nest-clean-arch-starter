import { DataSource, Repository } from 'typeorm'
import { IGetUserQuery } from '~/account/application/queries'
import { UserNotFoundException } from '~/account/domain/exceptions'
import { IDatabase } from '~/shared/infra/contracts/database'
import { UserTypeormDataMapper } from '~/shared/infra/database/typeorm/application/data-mappers'

export class GetUserTypeormQuery implements IGetUserQuery {
  private repository: Repository<UserTypeormDataMapper>

  constructor(private readonly databaseConnection: IDatabase<DataSource>) {
    const connection = this.databaseConnection.getConnection()
    this.repository = connection.getRepository(UserTypeormDataMapper)
  }

  async execute(input: IGetUserQuery.Input): IGetUserQuery.Output {
    const user = await this.repository.findOne({
      where: { id: input.userId },
    })
    if (!user) throw new UserNotFoundException()
    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      language: user.language,
      timezone: user.timezone,
    }
  }
}
