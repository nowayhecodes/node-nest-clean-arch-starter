import { DomainValidationException } from '~/shared/domain/exceptions'

/**
 * Represents a plain-text password before hashing.
 * Only used during account creation and password reset — never stored.
 * The domain stores `passwordHash` (string), not this VO.
 */
export class Password {
  /** At least 8 chars, one upper-case letter, one digit, one special char. */
  private static readonly REGEX = /^(?=.*[A-Z])(?=.*[!@#$%^&*.])(?=.*[0-9]).{8,}$/
  private static readonly MAX_LENGTH = 100

  private constructor(private readonly _value: string) {}

  static create(raw: string): Password {
    if (!raw || !Password.REGEX.test(raw) || raw.length > Password.MAX_LENGTH) {
      throw new DomainValidationException('Invalid password')
    }
    return new Password(raw)
  }

  get value(): string {
    return this._value
  }

  toString(): string {
    return this._value
  }
}
