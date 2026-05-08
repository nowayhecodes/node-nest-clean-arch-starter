import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, PrimaryColumn, UpdateDateColumn } from 'typeorm'

export class BaseTypeormDataMapper extends BaseEntity {
  @PrimaryColumn('uuid', { primary: true, name: 'id' })
  id: string

  @Column({ type: 'bigint', name: 'alternative_id' })
  alternativeId: string

  @CreateDateColumn({ name: 'created_date' })
  createdDate: Date

  @UpdateDateColumn({ name: 'updated_date', nullable: true })
  updatedDate: Date | null

  @DeleteDateColumn({ name: 'deleted_date', nullable: true })
  deletedDate: Date | null
}
