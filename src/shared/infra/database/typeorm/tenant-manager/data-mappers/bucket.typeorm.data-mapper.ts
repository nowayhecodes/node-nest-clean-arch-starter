import { Column, Entity, Index, JoinColumn, ManyToOne, Relation } from 'typeorm'
import { BaseTypeormDataMapper } from '~/shared/infra/database/typeorm/data-mapper'
import { TenantTypeormDataMapper } from '~/shared/infra/database/typeorm/tenant-manager/data-mappers/tenant-typeorm.data-mapper'

@Index('idx__uq__buckets', ['deletedDate', 'name', 'region'], { unique: true })
@Index('pk__buckets', ['id'], { unique: true })
@Index('idx__part__uq__buckets', ['name', 'region'], { unique: true })
@Entity('buckets', { schema: 'public' })
export class BucketTypeormDataMapper extends BaseTypeormDataMapper {
  @Column('character varying', { name: 'region', length: 10 })
  region: string

  @Column('character varying', { name: 'name', length: 300 })
  name: string

  @Column('character varying', { name: 'account_number', length: 50 })
  accountNumber: string

  @Column('character varying', { name: 'access_key_id', length: 256 })
  accessKeyId: string

  @Column('character varying', { name: 'secret_access_key', length: 256 })
  secretAccessKey: string

  @Column('boolean', { name: 'is_public' })
  isPublic: boolean

  @Column('boolean', { name: 'is_active' })
  isActive: boolean

  @ManyToOne(() => TenantTypeormDataMapper, (tenants) => tenants.buckets, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'tenant_id', referencedColumnName: 'id' }])
  tenant: Relation<TenantTypeormDataMapper>
}
