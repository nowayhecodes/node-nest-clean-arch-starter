import { Tenant } from '~/shared/domain/entities'
import { IDatabaseMapper } from '~/shared/infra/database/mapper'
import { TenantTypeormDataMapper } from '~/shared/infra/database/typeorm/tenant-manager/data-mappers/tenant-typeorm.data-mapper'

export class TenantTypeormMapper implements IDatabaseMapper<Tenant, TenantTypeormDataMapper> {
  generateDataMapper(entity: Tenant): TenantTypeormDataMapper {
    return new TenantTypeormDataMapper({
      id: entity.id,
      name: entity.name,
      slug: entity.slug,
      url: entity.url,
      blockedDate: entity.blockedDate,
      databaseHost: entity.database.host,
      databaseName: entity.database.name,
      databasePassword: entity.database.password,
      databasePort: entity.database.port,
      databaseSchema: entity.database.schema,
      databaseUsername: entity.database.username,
      designTokens: entity.designTokens,
      imageUploadedDate: entity.imageUploadedDate,
      createdDate: entity.createdDate,
      updatedDate: entity.updatedDate,
      deletedDate: entity.deletedDate,
    })
  }

  generateEntity(dataMapper: TenantTypeormDataMapper): Tenant {
    return Tenant.reconstitute({
      id: dataMapper.id,
      name: dataMapper.name,
      slug: dataMapper.slug,
      url: dataMapper.url,
      blockedDate: dataMapper.blockedDate,
      databaseHost: dataMapper.databaseHost,
      databaseName: dataMapper.databaseName,
      databasePassword: dataMapper.databasePassword,
      databasePort: dataMapper.databasePort,
      databaseSchema: dataMapper.databaseSchema,
      databaseUsername: dataMapper.databaseUsername,
      designTokens: dataMapper.designTokens,
      imageUploadedDate: dataMapper.imageUploadedDate,
      createdDate: dataMapper.createdDate,
      updatedDate: dataMapper.updatedDate,
      deletedDate: dataMapper.deletedDate,
    })
  }
}
