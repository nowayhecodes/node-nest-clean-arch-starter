import { AggregateRoot } from '~/shared/domain/entities/aggregate-root'
import { AccountCreatedEvent } from '~/shared/domain/events/account-created.event'
import { AccountDeletedEvent } from '~/shared/domain/events/account-deleted.event'
import {
  BlockedByAdminException,
  BlockedByWrongLoginTriesException,
  DomainValidationException,
  EmailAlreadyConfirmedException,
  EmailNotConfirmedException,
  InvalidCredentialsException,
} from '~/shared/domain/exceptions'
import { Email } from '~/shared/domain/value-objects/email.vo'
import { Password } from '~/shared/domain/value-objects/password.vo'

export class User extends AggregateRoot {
  private _email: Email
  private _firstName: string
  private _lastName: string
  private _emailConfirmedDate: Date | null
  private _passwordHash: string
  private _securityToken: string | null
  private _lockoutEndDate: Date | null
  private _adminBlockedDate: Date | null
  private _avatarImageUploadedDate: Date | null
  private _accessFailedCount: number
  private _logoutDate: Date | null
  private _language: string
  private _timezone: string
  /** GDPR / LGPD — timestamp when the user accepted the privacy policy */
  private _consentDate: Date | null

  private constructor(props: UserProps) {
    super({
      id: props.id,
      createdDate: props.createdDate,
      updatedDate: props.updatedDate,
      deletedDate: props.deletedDate,
    })
    this._email = props.email
    this._firstName = props.firstName
    this._lastName = props.lastName
    this._emailConfirmedDate = props.emailConfirmedDate
    this._passwordHash = props.passwordHash
    this._securityToken = props.securityToken
    this._lockoutEndDate = props.lockoutEndDate
    this._adminBlockedDate = props.adminBlockedDate
    this._avatarImageUploadedDate = props.avatarImageUploadedDate
    this._accessFailedCount = props.accessFailedCount
    this._logoutDate = props.logoutDate
    this._language = props.language
    this._timezone = props.timezone
    this._consentDate = props.consentDate
  }

  // ── Factories ────────────────────────────────────────────────────────────

  /**
   * Creates a brand-new user.
   * Validates email format, password strength, and name constraints via VOs.
   * Records an AccountCreatedEvent so the application layer can dispatch it.
   */
  static create(props: CreateUserProps): User {
    const email = Email.create(props.email)
    Password.create(props.password) // validate — value not stored, hash is stored
    User.validateName('firstName', props.firstName)
    User.validateName('lastName', props.lastName)

    const user = new User({
      id: props.id,
      email,
      firstName: props.firstName,
      lastName: props.lastName,
      passwordHash: props.passwordHash,
      securityToken: props.securityToken,
      language: props.language ?? 'en-US',
      timezone: props.timezone ?? 'UTC',
      consentDate: props.consentDate,
      emailConfirmedDate: null,
      lockoutEndDate: null,
      adminBlockedDate: null,
      avatarImageUploadedDate: null,
      accessFailedCount: 0,
      logoutDate: null,
    })

    user.addDomainEvent(new AccountCreatedEvent(user.id, email.value, props.firstName, user._language))

    return user
  }

  /**
   * Reconstitutes a User from a persistence record.
   * Skips validation — the data was already validated when first created.
   */
  static reconstitute(props: ReconstituteUserProps): User {
    return new User({
      ...props,
      email: Email.reconstitute(props.email),
    })
  }

  // ── Getters ──────────────────────────────────────────────────────────────

  get email(): string {
    return this._email.value
  }

  get firstName(): string {
    return this._firstName
  }

  get lastName(): string {
    return this._lastName
  }

  get emailConfirmedDate(): Date | null {
    return this._emailConfirmedDate
  }

  get passwordHash(): string {
    return this._passwordHash
  }

  get securityToken(): string | null {
    return this._securityToken
  }

  get lockoutEndDate(): Date | null {
    return this._lockoutEndDate
  }

  get adminBlockedDate(): Date | null {
    return this._adminBlockedDate
  }

  get avatarImageUploadedDate(): Date | null {
    return this._avatarImageUploadedDate
  }

  get accessFailedCount(): number {
    return this._accessFailedCount
  }

  get logoutDate(): Date | null {
    return this._logoutDate
  }

  get language(): string {
    return this._language
  }

  get timezone(): string {
    return this._timezone
  }

  get consentDate(): Date | null {
    return this._consentDate
  }

  // ── Behaviour ────────────────────────────────────────────────────────────

  /**
   * Validates the login attempt and throws on any failure.
   * On success, resets the failed-attempt counter.
   */
  login(input: LoginInput): void {
    this.isBlockedByAdmin()
    this.isLockedOutByWrongLoginTries()
    this.needEmailConfirm(input.needEmailConfirm)

    if (!input.isPasswordValid) {
      this.checkWrongLoginTries({
        failedTimesBlock: input.failedTimesBlock,
        blockedAccessTime: input.blockedAccessTime,
      })
      throw new InvalidCredentialsException()
    }

    this._accessFailedCount = 0
    this._lockoutEndDate = null
    this.update()
  }

  isBlockedByAdmin(): void {
    if (this._adminBlockedDate) throw new BlockedByAdminException()
  }

  logout(): void {
    this._logoutDate = new Date()
    this.update()
  }

  confirmAccount(): void {
    if (this._emailConfirmedDate) throw new EmailAlreadyConfirmedException()
    this._securityToken = null
    this._emailConfirmedDate = new Date()
    this.update()
  }

  updateSecurityToken(securityToken: string): void {
    this._securityToken = securityToken
    this.update()
  }

  updatePasswordHashAndSecurityToken(input: {
    password: string
    passwordHash: string
    securityToken: string | null
  }): void {
    Password.create(input.password) // validate new password via VO
    this._passwordHash = input.passwordHash
    this._securityToken = input.securityToken
    this._accessFailedCount = 0
    this._lockoutEndDate = null
    this.update()
  }

  securityTokenIsValid(securityToken: string): boolean {
    return this._securityToken === securityToken
  }

  accountIsVerified(): boolean {
    return !!this._emailConfirmedDate
  }

  /**
   * GDPR Art. 17 / LGPD Art. 18 — Right to Erasure.
   * Replaces all PII with irreversible placeholders and soft-deletes the record.
   */
  anonymize(): void {
    const placeholder = `deleted-${this.id}`
    this._firstName = placeholder
    this._lastName = placeholder
    this._email = Email.reconstitute(`${placeholder}@deleted.invalid`)
    this._passwordHash = ''
    this._securityToken = null
    this._avatarImageUploadedDate = null
    this._consentDate = null
    this.delete()
    this.addDomainEvent(new AccountDeletedEvent(this.id))
  }

  // ── Private helpers ──────────────────────────────────────────────────────

  private isLockedOutByWrongLoginTries(): void {
    if (this._lockoutEndDate && this._lockoutEndDate >= new Date()) {
      throw new BlockedByWrongLoginTriesException()
    }
  }

  private needEmailConfirm(required: boolean): void {
    if (required && !this._emailConfirmedDate) {
      throw new EmailNotConfirmedException()
    }
  }

  private checkWrongLoginTries(input: { failedTimesBlock: number | null; blockedAccessTime: number | null }): void {
    if (!input.failedTimesBlock || !input.blockedAccessTime) return

    this._accessFailedCount += 1
    if (this._accessFailedCount > input.failedTimesBlock) {
      const lockoutEnd = new Date()
      lockoutEnd.setMinutes(lockoutEnd.getMinutes() + input.blockedAccessTime)
      this._lockoutEndDate = lockoutEnd
      this._accessFailedCount = 0
    }
  }

  private static validateName(field: string, value: string): void {
    if (!value || value.length > 200) {
      throw new DomainValidationException(`Invalid ${field}`)
    }
  }
}

// ── Supporting types ────────────────────────────────────────────────────────

type UserProps = {
  id?: string
  email: Email
  firstName: string
  lastName: string
  emailConfirmedDate: Date | null
  passwordHash: string
  securityToken: string | null
  lockoutEndDate: Date | null
  adminBlockedDate: Date | null
  avatarImageUploadedDate: Date | null
  accessFailedCount: number
  logoutDate: Date | null
  language: string
  timezone: string
  consentDate: Date | null
  createdDate?: Date
  updatedDate?: Date | null
  deletedDate?: Date | null
}

export type CreateUserProps = {
  id: string
  email: string
  password: string
  passwordHash: string
  firstName: string
  lastName: string
  securityToken: string
  language?: string
  timezone?: string
  consentDate: Date
}

export type ReconstituteUserProps = {
  id: string
  email: string
  firstName: string
  lastName: string
  emailConfirmedDate: Date | null
  passwordHash: string
  securityToken: string | null
  lockoutEndDate: Date | null
  adminBlockedDate: Date | null
  avatarImageUploadedDate: Date | null
  accessFailedCount: number
  logoutDate: Date | null
  language: string
  timezone: string
  consentDate: Date | null
  createdDate?: Date
  updatedDate?: Date | null
  deletedDate?: Date | null
  alternativeId?: number
}

type LoginInput = {
  needEmailConfirm: boolean
  isPasswordValid: boolean
  failedTimesBlock: number | null
  blockedAccessTime: number | null
}
