import { Environment } from '~/shared/infra/config/environment.enum'
import { TypeormDatabaseConstants } from '~/shared/infra/database/typeorm/constants'
import { BaseTypeormMigration } from '~/shared/infra/database/typeorm/migrations/base-typeorm-migration'

export class SeedSchema1661134039890 extends BaseTypeormMigration {
  constructor() {
    super({
      fileName: 'SeedSchema1661134039890',
      filePathUp: TypeormDatabaseConstants.ApplicationScript.SEED_APPLICATION_SCHEMA,
      filePathDown: TypeormDatabaseConstants.ApplicationScript.SEED_APPLICATION_SCHEMA_DOWN,
      ignoreEnvironments: [Environment.PROD],
      isPublicSchema: false,
    })
  }
}
