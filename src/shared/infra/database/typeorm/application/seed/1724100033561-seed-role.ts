import { Environment } from '~/shared/infra/config/environment.enum'
import { TypeormDatabaseConstants } from '~/shared/infra/database/typeorm/constants'
import { BaseTypeormMigration } from '~/shared/infra/database/typeorm/migrations/base-typeorm-migration'

export class SeedRole1724100033561 extends BaseTypeormMigration {
  constructor() {
    super({
      fileName: 'SeedRole1724100033561',
      filePathUp: TypeormDatabaseConstants.SeedScript.SEED_ROLE,
      filePathDown: TypeormDatabaseConstants.SeedScript.SEED_ROLE_DOWN,
      ignoreEnvironments: [Environment.PROD],
      isPublicSchema: false,
    })
  }
}
