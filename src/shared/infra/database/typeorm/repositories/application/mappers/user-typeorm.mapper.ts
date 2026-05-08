import { User } from '~/shared/domain/entities/user'
import { IDatabaseMapper } from '~/shared/infra/database/mapper'
import { UserTypeormDataMapper } from '~/shared/infra/database/typeorm/application/data-mappers/user-typeorm.data-mapper'

export class UserTypeormMapper implements IDatabaseMapper<User, UserTypeormDataMapper> {
  generateDataMapper(entity: User): UserTypeormDataMapper {
    return new UserTypeormDataMapper({
      id: entity.id,
      adminBlockedDate: entity.adminBlockedDate,
      accessFailedCount: entity.accessFailedCount,
      email: entity.email,
      emailConfirmedDate: entity.emailConfirmedDate,
      lastName: entity.lastName,
      firstName: entity.firstName,
      lockoutEndDate: entity.lockoutEndDate,
      language: entity.language,
      timezone: entity.timezone,
      consentDate: entity.consentDate,
      avatarImageUploadedDate: entity.avatarImageUploadedDate,
      passwordHash: entity.passwordHash,
      logoutDate: entity.logoutDate,
      securityToken: entity.securityToken,
      createdDate: entity.createdDate,
      updatedDate: entity.updatedDate,
      deletedDate: entity.deletedDate,
    })
  }

  generateEntity(dataMapper: UserTypeormDataMapper): User {
    return User.reconstitute({
      id: dataMapper.id,
      alternativeId: Number(dataMapper.alternativeId),
      adminBlockedDate: dataMapper.adminBlockedDate,
      accessFailedCount: dataMapper.accessFailedCount,
      email: dataMapper.email,
      emailConfirmedDate: dataMapper.emailConfirmedDate,
      lastName: dataMapper.lastName,
      firstName: dataMapper.firstName,
      lockoutEndDate: dataMapper.lockoutEndDate,
      language: dataMapper.language,
      timezone: dataMapper.timezone,
      consentDate: dataMapper.consentDate,
      avatarImageUploadedDate: dataMapper.avatarImageUploadedDate,
      passwordHash: dataMapper.passwordHash,
      logoutDate: dataMapper.logoutDate,
      securityToken: dataMapper.securityToken,
      createdDate: dataMapper.createdDate,
      updatedDate: dataMapper.updatedDate,
      deletedDate: dataMapper.deletedDate,
    })
  }
}
