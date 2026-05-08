import { Environment } from '~/shared/infra/config/environment.enum'
import { TypeormDatabaseConstants } from '~/shared/infra/database/typeorm/constants'
import { BaseTypeormMigration } from '~/shared/infra/database/typeorm/migrations/base-typeorm-migration'

export class SeedUser1724099376177 extends BaseTypeormMigration {
  constructor() {
    super({
      fileName: 'SeedUser1724099376177',
      filePathUp: TypeormDatabaseConstants.SeedScript.SEED_USER,
      filePathDown: TypeormDatabaseConstants.SeedScript.SEED_USER_DOWN,
      ignoreEnvironments: [Environment.PROD],
      isPublicSchema: false,
    })
  }
}
