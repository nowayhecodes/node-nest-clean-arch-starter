import { Logger } from '@nestjs/common'
import { MigrationInterface, QueryRunner } from 'typeorm'
import { Environment } from '~/shared/infra/config/environment.enum'
import { MigrationFileHelper } from '~/shared/infra/database/helpers/migration-file-helper'

export class BaseTypeormMigration implements MigrationInterface {
  private logger = new Logger()
  private filePathUp: string
  private filePathDown: string
  private publicSchema: boolean
  private currentEnvironment: Environment
  private ignoreEnvironments: Environment[]
  private fileName: string

  constructor(props: {
    filePathUp: string
    filePathDown: string
    isPublicSchema: boolean
    ignoreEnvironments: Environment[]
    fileName: string
  }) {
    if (!process.env.ENVIRONMENT) throw new Error('NODE_ENV not defined')
    this.filePathUp = props.filePathUp
    this.filePathDown = props.filePathDown
    this.publicSchema = props.isPublicSchema
    this.currentEnvironment = process.env.ENVIRONMENT as Environment
    this.ignoreEnvironments = props.ignoreEnvironments
  }

  async up(queryRunner: QueryRunner): Promise<any> {
    if (this.ignoreEnvironment()) {
      this.logger.debug(`Migration ${this.fileName} not run in this environment`, this.currentEnvironment)
      return
    }
    const sql = MigrationFileHelper.read(this.filePathUp)
    const config = queryRunner.connection.options as any
    await queryRunner.query(
      this.sanitizeSql({
        sql: sql,
        schemaName: config.schema,
        ownerName: config.username,
      }),
    )
  }

  async down(queryRunner: QueryRunner): Promise<any> {
    if (this.ignoreEnvironment()) {
      this.logger.debug(`Migration revert ${this.fileName} not run in this environment`, this.currentEnvironment)
      return
    }
    const sql = MigrationFileHelper.read(this.filePathDown)
    const config = queryRunner.connection.options as any
    await queryRunner.query(
      this.sanitizeSql({
        sql: sql,
        schemaName: config.schema,
        ownerName: config.username,
      }),
    )
  }

  private ignoreEnvironment() {
    return this.ignoreEnvironments.includes(this.currentEnvironment)
  }

  private replaceOwnerName(props: { sql: string; ownerName: string; replacedName: string }) {
    return props.sql.replaceAll(props.ownerName, props.replacedName)
  }

  private replacePublicSchema(props: { sql: string; replacedName: string }) {
    return props.sql.replaceAll('public', props.replacedName)
  }

  private sanitizeSql(props: { sql: string; ownerName: string; schemaName: string }) {
    let sanitizedSql = this.replaceOwnerName({
      ownerName: this.publicSchema ? 'admin_tenant' : 'admin_project',
      replacedName: props.ownerName,
      sql: props.sql,
    })
    if (!this.publicSchema) {
      sanitizedSql = this.replacePublicSchema({
        replacedName: props.schemaName,
        sql: sanitizedSql,
      })
    }
    return sanitizedSql
  }
}
