import { TypeormDatabaseConstants } from '~/shared/infra/database/typeorm/constants'
import { BaseTypeormMigration } from '~/shared/infra/database/typeorm/migrations/base-typeorm-migration'

export class CreatePublicSchema1643673600000 extends BaseTypeormMigration {
  constructor() {
    super({
      fileName: 'CreatePublicSchema1643673600000',
      filePathUp: TypeormDatabaseConstants.TenantManagerScript.CREATE_TENANT_MANAGER_SCHEMA,
      filePathDown: TypeormDatabaseConstants.TenantManagerScript.CREATE_TENANT_MANAGER_SCHEMA_DOWN,
      ignoreEnvironments: [],
      isPublicSchema: true,
    })
  }
}
