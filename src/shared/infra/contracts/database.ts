export interface IDatabase<T = any> {
  connect(): Promise<void>
  disconnect(): Promise<void>
  runMigrations(): Promise<void>
  getConnection(): T
}
