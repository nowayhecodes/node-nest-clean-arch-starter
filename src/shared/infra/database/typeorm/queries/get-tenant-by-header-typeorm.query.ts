import { DataSource, Repository } from 'typeorm'
import { IGetTenantByHeaderQuery } from '~/shared/application/queries/tenants'
import { TenantDirectoryEnum } from '~/shared/domain/constants/tenant-directory.enum'
import {
  TenantBlockedException,
  TenantIdOrOriginHeaderNotProvided,
  TenantNotFoundException,
} from '~/shared/domain/exceptions'
import { IDatabase } from '~/shared/infra/contracts/database'
import { IFileSystem } from '~/shared/infra/contracts/file-system'
import { TenantTypeormDataMapper } from '~/shared/infra/database/typeorm/tenant-manager/data-mappers'

export class GetTenantByHeaderTypeormQuery implements IGetTenantByHeaderQuery {
  private repository: Repository<TenantTypeormDataMapper>

  constructor(
    private readonly databaseConnection: IDatabase<DataSource>,
    private readonly fileSystem: IFileSystem,
  ) {
    const connection = this.databaseConnection.getConnection()
    this.repository = connection.getRepository(TenantTypeormDataMapper)
  }

  async execute({ tenantId, origin }: IGetTenantByHeaderQuery.Input): IGetTenantByHeaderQuery.Output {
    if (!tenantId && !origin) throw new TenantIdOrOriginHeaderNotProvided()
    const tenant = await this.repository
      .createQueryBuilder('tenant')
      .where('tenant.id = :tenantId', { tenantId })
      .orWhere('tenant.url = :origin', { origin })
      .getOne()
    if (!tenant) throw new TenantNotFoundException()
    if (tenant.blockedDate) throw new TenantBlockedException()
    let logoUrl: string | null = null
    if (tenant.imageUploadedDate) {
      logoUrl = await this.fileSystem.getFileUrl({
        filePath: `${TenantDirectoryEnum.Logo.FILE_PATH}/${tenant.id}.${TenantDirectoryEnum.Logo.FILE_EXTENSION}`,
      })
    }
    return {
      id: tenant.id,
      name: tenant.name,
      slug: tenant.slug,
      url: tenant.url,
      logoUrl,
      designTokens: tenant.designTokens,
      imageUploadedDate: tenant.imageUploadedDate,
      databaseHost: tenant.databaseHost,
      databaseName: tenant.databaseName,
      databasePassword: tenant.databasePassword,
      databasePort: tenant.databasePort,
      databaseSchema: tenant.databaseSchema,
      databaseUsername: tenant.databaseUsername,
      blockedDate: tenant.blockedDate,
    }
  }
}
