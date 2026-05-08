import { AggregateRoot } from '~/shared/domain/entities/aggregate-root'
import { TenantDatabase } from '~/shared/domain/value-objects/tenant-database.vo'

export class Tenant extends AggregateRoot {
  private _name: string
  private _slug: string
  private _url: string
  private _database: TenantDatabase
  private _imageUploadedDate: Date | null
  private _blockedDate: Date | null
  private _designTokens: object

  private constructor(props: TenantProps) {
    super({
      id: props.id,
      createdDate: props.createdDate,
      updatedDate: props.updatedDate,
      deletedDate: props.deletedDate,
    })
    this._name = props.name
    this._slug = props.slug
    this._url = props.url
    this._database = props.database
    this._imageUploadedDate = props.imageUploadedDate ?? null
    this._blockedDate = props.blockedDate ?? null
    this._designTokens = props.designTokens ?? {}
  }

  // ── Factories ────────────────────────────────────────────────────────────

  static create(props: CreateTenantProps): Tenant {
    return new Tenant({
      name: props.name,
      slug: props.slug,
      url: props.url,
      database: new TenantDatabase(
        props.databaseHost,
        props.databasePort,
        props.databaseName,
        props.databaseSchema,
        props.databaseUsername,
        props.databasePassword,
      ),
    })
  }

  /** Reconstitutes from persistence — no validation performed. */
  static reconstitute(props: ReconstituteTenantProps): Tenant {
    return new Tenant({
      ...props,
      database: new TenantDatabase(
        props.databaseHost,
        props.databasePort,
        props.databaseName,
        props.databaseSchema,
        props.databaseUsername,
        props.databasePassword,
      ),
    })
  }

  // ── Getters ──────────────────────────────────────────────────────────────

  get name(): string {
    return this._name
  }

  get slug(): string {
    return this._slug
  }

  get url(): string {
    return this._url
  }

  /** All database connection parameters as a single Value Object. */
  get database(): TenantDatabase {
    return this._database
  }

  get imageUploadedDate(): Date | null {
    return this._imageUploadedDate
  }

  get blockedDate(): Date | null {
    return this._blockedDate
  }

  get designTokens(): object {
    return this._designTokens
  }
}

// ── Supporting types ────────────────────────────────────────────────────────

type TenantProps = {
  id?: string
  name: string
  slug: string
  url: string
  database: TenantDatabase
  imageUploadedDate?: Date | null
  blockedDate?: Date | null
  designTokens?: object
  createdDate?: Date
  updatedDate?: Date | null
  deletedDate?: Date | null
}

export type CreateTenantProps = {
  name: string
  slug: string
  url: string
  databaseHost: string
  databasePort: number
  databaseName: string
  databaseSchema: string
  databaseUsername: string
  databasePassword: string
}

export type ReconstituteTenantProps = {
  id: string
  name: string
  slug: string
  url: string
  databaseHost: string
  databasePort: number
  databaseName: string
  databaseSchema: string
  databaseUsername: string
  databasePassword: string
  imageUploadedDate?: Date | null
  blockedDate?: Date | null
  designTokens?: object
  createdDate?: Date
  updatedDate?: Date | null
  deletedDate?: Date | null
}
