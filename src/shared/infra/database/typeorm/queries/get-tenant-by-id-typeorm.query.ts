import { DataSource, Repository } from 'typeorm'
import { IGetTenantByIdQuery } from '~/shared/application/queries/tenants/get-tenant-by-id.query'
import { TenantBlockedException, TenantNotFoundException } from '~/shared/domain/exceptions'
import { IDatabase } from '~/shared/infra/contracts/database'
import { TenantTypeormDataMapper } from '~/shared/infra/database/typeorm/tenant-manager/data-mappers'

export class GetTenantByIdTypeormQuery implements IGetTenantByIdQuery {
  private repository: Repository<TenantTypeormDataMapper>

  constructor(private readonly databaseConnection: IDatabase<DataSource>) {
    const connection = this.databaseConnection.getConnection()
    this.repository = connection.getRepository(TenantTypeormDataMapper)
  }

  async execute({ tenantId }: IGetTenantByIdQuery.Input): IGetTenantByIdQuery.Output {
    const tenant = await this.repository.findOne({
      where: {
        id: tenantId,
      },
    })
    if (!tenant) throw new TenantNotFoundException()
    if (tenant.blockedDate) throw new TenantBlockedException()
    return {
      id: tenant.id,
      name: tenant.name,
      slug: tenant.slug,
      url: tenant.url,
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
