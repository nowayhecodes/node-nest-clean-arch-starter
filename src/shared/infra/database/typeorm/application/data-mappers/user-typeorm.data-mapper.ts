import { Column, Entity, Index } from 'typeorm'
import { BaseTypeormDataMapper } from '~/shared/infra/database/typeorm/data-mapper'

@Index('idx__uq__users', ['deletedDate', 'email'], { unique: true })
@Index('idx__part__uq__users', ['email'], { unique: true })
@Index('pk__users', ['id'], { unique: true })
@Entity('users')
export class UserTypeormDataMapper extends BaseTypeormDataMapper {
  @Column('character varying', { name: 'first_name', length: 200 })
  firstName: string

  @Column('character varying', { name: 'last_name', length: 200 })
  lastName: string

  @Column('character varying', { name: 'email', length: 300 })
  email: string

  @Column('timestamp with time zone', {
    name: 'email_confirmed_date',
    nullable: true,
  })
  emailConfirmedDate: Date | null

  @Column('character varying', { name: 'password_hash' })
  passwordHash: string

  @Column('character varying', { name: 'security_token', nullable: true })
  securityToken: string | null

  @Column('smallint', { name: 'access_failed_count', default: 0 })
  accessFailedCount: number

  @Column('timestamp with time zone', {
    name: 'lockout_end_date',
    nullable: true,
  })
  lockoutEndDate: Date | null

  @Column('timestamp with time zone', {
    name: 'admin_blocked_date',
    nullable: true,
  })
  adminBlockedDate: Date | null

  @Column('timestamp with time zone', {
    name: 'avatar_image_uploaded_date',
    nullable: true,
  })
  avatarImageUploadedDate: Date | null

  @Column('timestamp with time zone', { name: 'logout_date', nullable: true })
  logoutDate: Date | null

  @Column('character varying', { name: 'language', length: 10, default: 'en-US' })
  language: string

  @Column('character varying', { name: 'timezone', length: 100, default: 'UTC' })
  timezone: string

  /** GDPR / LGPD — timestamp when the user accepted the privacy policy */
  @Column('timestamp with time zone', { name: 'consent_date', nullable: true })
  consentDate: Date | null

  constructor(props: Partial<UserTypeormDataMapper>) {
    super()
    Object.assign(this, props)
  }
}
