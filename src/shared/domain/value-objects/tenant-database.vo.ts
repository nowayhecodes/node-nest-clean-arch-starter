/**
 * Value Object that encapsulates the database connection parameters for a tenant.
 * Keeping this as a VO avoids polluting the Tenant aggregate with flat infra fields.
 */
export class TenantDatabase {
  constructor(
    readonly host: string,
    readonly port: number,
    readonly name: string,
    readonly schema: string,
    readonly username: string,
    readonly password: string,
  ) {}

  equals(other: TenantDatabase): boolean {
    return (
      this.host === other.host &&
      this.port === other.port &&
      this.name === other.name &&
      this.schema === other.schema &&
      this.username === other.username
    )
  }
}
