import { TypeormDatabaseConstants } from '~/shared/infra/database/typeorm/constants'
import { BaseTypeormMigration } from '~/shared/infra/database/typeorm/migrations/base-typeorm-migration'

export class CreateSchema1661113028804 extends BaseTypeormMigration {
  constructor() {
    super({
      fileName: 'CreateSchema1661113028804',
      filePathUp: TypeormDatabaseConstants.ApplicationScript.CREATE_APPLICATION_SCHEMA,
      filePathDown: TypeormDatabaseConstants.ApplicationScript.CREATE_APPLICATION_SCHEMA_DOWN,
      ignoreEnvironments: [],
      isPublicSchema: false,
    })
  }
}
