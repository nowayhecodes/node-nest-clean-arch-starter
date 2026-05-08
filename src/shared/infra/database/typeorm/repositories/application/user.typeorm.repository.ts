import { User } from '~/shared/domain/entities/user'
import { IUserRepository } from '~/shared/domain/repositories/tenant/user.repository'
import { UserTypeormDataMapper } from '~/shared/infra/database/typeorm/application/data-mappers/user-typeorm.data-mapper'
import { BaseTypeormRepository } from '~/shared/infra/database/typeorm/repositories/base-typeorm.repository'

export class UserTypeormRepository
  extends BaseTypeormRepository<UserTypeormDataMapper, User>
  implements IUserRepository
{
  async findById(id: string): Promise<User | null> {
    const dataMapper = await this.repository.findOne({ where: { id } })
    if (!dataMapper) return null
    return this.mapper.generateEntity(dataMapper)
  }

  async findByEmail(email: string): Promise<User | null> {
    const dataMapper = await this.repository.findOne({ where: { email } })
    if (!dataMapper) return null
    return this.mapper.generateEntity(dataMapper)
  }
}
