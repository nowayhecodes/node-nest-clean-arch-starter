import { DomainValidationException } from '~/shared/domain/exceptions'

export class Email {
  private static readonly REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  private static readonly MAX_LENGTH = 300

  private constructor(private readonly _value: string) {}

  static create(raw: string): Email {
    if (!raw || !Email.REGEX.test(raw) || raw.length > Email.MAX_LENGTH) {
      throw new DomainValidationException('Invalid email')
    }
    return new Email(raw.toLowerCase().trim())
  }

  /** Rebuilds from a persisted value — skips validation. */
  static reconstitute(raw: string): Email {
    return new Email(raw)
  }

  get value(): string {
    return this._value
  }

  equals(other: Email): boolean {
    return this._value === other._value
  }

  toString(): string {
    return this._value
  }
}
