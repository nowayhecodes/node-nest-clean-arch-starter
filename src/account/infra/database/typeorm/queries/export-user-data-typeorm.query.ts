import { DataSource, Repository } from 'typeorm'
import { IExportUserDataQuery } from '~/account/application/queries'
import { UserNotFoundException } from '~/account/domain/exceptions'
import { IDatabase } from '~/shared/infra/contracts/database'
import { UserTypeormDataMapper } from '~/shared/infra/database/typeorm/application/data-mappers'

export class ExportUserDataTypeormQuery implements IExportUserDataQuery {
  private repository: Repository<UserTypeormDataMapper>

  constructor(private readonly databaseConnection: IDatabase<DataSource>) {
    this.repository = databaseConnection.getConnection().getRepository(UserTypeormDataMapper)
  }

  async execute(input: IExportUserDataQuery.Input): IExportUserDataQuery.Output {
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
      emailConfirmedDate: user.emailConfirmedDate,
      consentDate: user.consentDate,
      createdDate: user.createdDate,
    }
  }
}
