import { config } from 'dotenv'
import { DataSourceOptions } from 'typeorm'

config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
})

export const tenantManagerDatabaseConfig: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  migrations: [`${__dirname}/../tenant-manager/migrations/*{.ts,.js}`],
  entities: [`${__dirname}/../tenant-manager/data-mappers/*.{js,ts}`],
  logging: process.env.DB_LOGGING === 'true',
  schema: 'public',
  name: 'tenant-manager',
  applicationName: 'tenant-manager',
}

export const applicationDatabaseConfig: DataSourceOptions = {
  type: 'postgres',
  host: process.env.TENANT_DB_HOST,
  port: Number(process.env.TENANT_DB_PORT),
  username: process.env.TENANT_DB_USER,
  password: process.env.TENANT_DB_PASS,
  database: process.env.TENANT_DB_NAME,
  migrations: [`${__dirname}/../application/migrations/*{.ts,.js}`],
  entities: [`${__dirname}/../application/data-mappers/*.{js,ts}`],
  logging: process.env.DB_LOGGING === 'true',
  schema: process.env.TENANT_DB_SCHEMA,
}
