import { Tenant } from '~/shared/domain/entities'

export interface ITenantRepository {
  findById(id: string): Promise<Tenant | null>
  findBySlug(slug: string): Promise<Tenant | null>
  save(tenant: Tenant): Promise<Tenant>
  softDelete(id: string): Promise<void>
  createDatabaseRole(input: { username: string; password: string }): Promise<void>
  deleteDatabaseRole(username: string): Promise<void>
  createSchema(input: { schema: string; username: string }): Promise<void>
  dropSchema(schema: string): Promise<void>
}
