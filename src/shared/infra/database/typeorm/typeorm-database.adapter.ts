import { DataSource, DataSourceOptions } from 'typeorm'
import { IDatabase } from '~/shared/infra/contracts/database'

export class TypeormDatabaseAdapter implements IDatabase {
  private connection: DataSource | undefined = undefined
  private config: DataSourceOptions
  dataSource: DataSource

  constructor(props: { config: DataSourceOptions }) {
    this.config = props.config
    this.dataSource = new DataSource(this.config)
  }

  async connect(): Promise<void> {
    if (this.connection) return
    const connection = await this.dataSource.initialize()
    this.connection = connection
  }

  disconnect(): Promise<void> {
    if (!this.connection) return Promise.resolve()
    return this.connection.destroy()
  }

  getConnection(): DataSource {
    if (!this.connection) throw new Error('Database is not connected')
    return this.connection
  }

  async runMigrations(): Promise<void> {
    if (!this.connection) return Promise.resolve()
    await this.connection.runMigrations()
  }

  public set databaseConnection(connection: DataSource) {
    this.connection = connection
  }
}
