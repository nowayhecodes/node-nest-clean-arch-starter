import { join } from 'path'

const tenantManagerScriptPath = join(__dirname, '..', 'tenant-manager', 'migrations', 'scripts')
const applicationScriptPath = join(__dirname, '..', 'application', 'migrations', 'scripts')
const seedScriptPath = join(__dirname, '..', 'application', 'seed', 'scripts')

export namespace TypeormDatabaseConstants {
  export const TenantManagerScript = {
    CREATE_TENANT_MANAGER_SCHEMA: `${tenantManagerScriptPath}/1643673600000-create-tenant-manager-schema.up.sql`,
    CREATE_TENANT_MANAGER_SCHEMA_DOWN: `${tenantManagerScriptPath}/1643673600000-create-tenant-manager-schema.down.sql`,
    SEED_TENANT_MANAGER_SCHEMA: `${tenantManagerScriptPath}/1643673600001-seed-tenant-manager-schema.up.sql`,
    SEED_TENANT_MANAGER_SCHEMA_DOWN: `${tenantManagerScriptPath}/1643673600001-seed-tenant-manager-schema.down.sql`,
  }
  export const ApplicationScript = {
    CREATE_APPLICATION_SCHEMA: `${applicationScriptPath}/1661113028804-create-application-schema.up.sql`,
    CREATE_APPLICATION_SCHEMA_DOWN: `${applicationScriptPath}/1661113028804-create-application-schema.down.sql`,
    SEED_APPLICATION_SCHEMA: `${applicationScriptPath}/1661134039890-seed-application-schema.up.sql`,
    SEED_APPLICATION_SCHEMA_DOWN: `${applicationScriptPath}/1661134039890-seed-application-schema.down.sql`,
    SEED_TIME_ZONES_UP: `${applicationScriptPath}/1735331408215-seed-time-zones.up.sql`,
    SEED_TIME_ZONES_DOWN: `${applicationScriptPath}/1735331408215-seed-time-zones.down.sql`,
  }
  export const SeedScript = {
    SEED_USER: `${seedScriptPath}/1724099376177-seed-user.up.sql`,
    SEED_USER_DOWN: `${seedScriptPath}/1724099376177-seed-user.down.sql`,
    SEED_ROLE: `${seedScriptPath}/1724100033561-seed-role.up.sql`,
    SEED_ROLE_DOWN: `${seedScriptPath}/1724100033561-seed-role.down.sql`,
  }
}
