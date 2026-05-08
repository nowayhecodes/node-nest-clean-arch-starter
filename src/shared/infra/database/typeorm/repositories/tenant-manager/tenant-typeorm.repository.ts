import { Tenant } from '~/shared/domain/entities'
import { ITenantRepository } from '~/shared/domain/repositories/public/tenant.repository'
import { BaseTypeormRepository } from '~/shared/infra/database/typeorm/repositories/base-typeorm.repository'
import { TenantTypeormDataMapper } from '~/shared/infra/database/typeorm/tenant-manager/data-mappers'

export class TenantTypeormRepository
  extends BaseTypeormRepository<TenantTypeormDataMapper, Tenant>
  implements ITenantRepository
{
  async findById(id: string): Promise<Tenant | null> {
    const dataMapper = await this.repository.findOne({ where: { id } })
    if (!dataMapper) return null
    return this.mapper.generateEntity(dataMapper)
  }

  async findBySlug(slug: string): Promise<Tenant | null> {
    const dataMapper = await this.repository.findOne({ where: { slug } })
    if (!dataMapper) return null
    return this.mapper.generateEntity(dataMapper)
  }

  async dropSchema(schema: string): Promise<void> {
    await this.repository.query(`DO
    $do$
    BEGIN
       IF EXISTS (
          SELECT schema_name
          FROM information_schema.schemata
          WHERE schema_name = '${schema}') THEN
    
          DROP SCHEMA ${schema} CASCADE;
          RAISE NOTICE 'Schema "${schema}" has been dropped.';
       ELSE
          RAISE NOTICE 'Schema "${schema}" does not exist. Skipping.';
       END IF;
    END
    $do$;`)
  }

  async deleteDatabaseRole(username: string): Promise<void> {
    await this.repository.query(`
        DO
      $do$
      BEGIN
          IF EXISTS (
            SELECT FROM pg_catalog.pg_roles
            WHERE rolname = '${username}') THEN
      
            DROP ROLE ${username};
            RAISE NOTICE 'Role "${username}" has been deleted.';
          ELSE
            RAISE NOTICE 'Role "${username}" does not exist. Skipping.';
          END IF;
      END
      $do$;
   `)
  }

  async createDatabaseRole(input: { username: string; password: string }): Promise<void> {
    await this.repository.query(
      `DO
      $do$
      BEGIN
         IF EXISTS (
            SELECT FROM pg_catalog.pg_roles
            WHERE  rolname = '${input.username}') THEN
      
            RAISE NOTICE 'Role "${input.username}" already exists. Skipping.';
         ELSE
            CREATE ROLE ${input.username} WITH LOGIN PASSWORD '${input.password}';
         END IF;
      END
      $do$;`,
    )
  }

  async createSchema(input: { schema: string; username: string }): Promise<void> {
    await this.repository.query(`CREATE SCHEMA IF NOT EXISTS ${input.schema}`)
    await this.repository.query(`GRANT ALL PRIVILEGES ON SCHEMA ${input.schema} TO ${input.username};`)
  }
}
