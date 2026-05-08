import { TypeormDatabaseConstants } from '~/shared/infra/database/typeorm/constants'
import { BaseTypeormMigration } from '~/shared/infra/database/typeorm/migrations/base-typeorm-migration'
const { ApplicationScript } = TypeormDatabaseConstants

export class SeedTimeZones1735331408215 extends BaseTypeormMigration {
  constructor() {
    super({
      fileName: 'SeedTimeZones1735331408215',
      filePathUp: ApplicationScript.SEED_TIME_ZONES_UP,
      filePathDown: ApplicationScript.SEED_TIME_ZONES_DOWN,
      ignoreEnvironments: [],
      isPublicSchema: false,
    })
  }
}
