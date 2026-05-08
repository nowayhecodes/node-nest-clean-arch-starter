import { Column, Entity, Index, OneToMany, Relation } from 'typeorm'
import { BaseTypeormDataMapper } from '~/shared/infra/database/typeorm/data-mapper'
import { BucketTypeormDataMapper } from '~/shared/infra/database/typeorm/tenant-manager/data-mappers/bucket.typeorm.data-mapper'

@Index('idx__part__uq__tenants__database', ['databaseHost', 'databaseName', 'databasePort', 'databaseSchema'], {
  unique: true,
})
@Index(
  'idx__uq__tenants__database',
  ['databaseHost', 'databaseName', 'databasePort', 'databaseSchema', 'deletedDate'],
  { unique: true },
)
@Index('idx__uq__tenants__slug', ['deletedDate', 'slug'], { unique: true })
@Index('idx__uq__tenants__url', ['deletedDate', 'url'], { unique: true })
@Index('pk__tenants', ['id'], { unique: true })
@Index('idx__part__uq__tenants__slug', ['slug'], { unique: true })
@Index('idx__part__uq__tenants__url', ['url'], { unique: true })
@Entity('tenants', { schema: 'public' })
export class TenantTypeormDataMapper extends BaseTypeormDataMapper {
  @Column('character varying', { name: 'name', length: 100 })
  name: string

  @Column('character varying', { name: 'slug', length: 58 })
  slug: string

  @Column('character varying', { name: 'url', length: 400 })
  url: string

  @Column('character varying', { name: 'database_host', length: 400 })
  databaseHost: string

  @Column('integer', { name: 'database_port' })
  databasePort: number

  @Column('character varying', { name: 'database_name', length: 63 })
  databaseName: string

  @Column('character varying', { name: 'database_schema', length: 63 })
  databaseSchema: string

  @Column('character varying', { name: 'database_username', length: 63 })
  databaseUsername: string

  @Column('character varying', { name: 'database_password', length: 256 })
  databasePassword: string

  @Column('jsonb', { name: 'design_tokens' })
  designTokens: object

  @Column('timestamp with time zone', {
    name: 'image_uploaded_date',
    nullable: true,
  })
  imageUploadedDate: Date | null

  @Column('timestamp with time zone', { name: 'blocked_date', nullable: true })
  blockedDate: Date | null

  @OneToMany(() => BucketTypeormDataMapper, (buckets) => buckets.tenant)
  buckets: Relation<BucketTypeormDataMapper[]>

  constructor(props: Partial<TenantTypeormDataMapper>) {
    super()
    Object.assign(this, props)
  }
}
