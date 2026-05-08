import { Environment } from '~/shared/infra/config/environment.enum'
import { TypeormDatabaseConstants } from '~/shared/infra/database/typeorm/constants'
import { BaseTypeormMigration } from '~/shared/infra/database/typeorm/migrations/base-typeorm-migration'

export class SeedPublicSchema1643673600001 extends BaseTypeormMigration {
  constructor() {
    super({
      fileName: 'SeedPublicSchema1643673600001',
      filePathUp: TypeormDatabaseConstants.TenantManagerScript.SEED_TENANT_MANAGER_SCHEMA,
      filePathDown: TypeormDatabaseConstants.TenantManagerScript.SEED_TENANT_MANAGER_SCHEMA_DOWN,
      ignoreEnvironments: [Environment.PROD],
      isPublicSchema: true,
    })
  }
}
