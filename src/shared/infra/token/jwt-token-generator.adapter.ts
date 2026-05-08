import { decode, sign, verify } from 'jsonwebtoken'
import { ExpiredTokenException, InvalidTokenException } from '~/shared/domain/exceptions'
import { ITokenGenerator } from '~/shared/infra/contracts/token-generator'

export class JwtTokenGeneratorAdapter implements ITokenGenerator {
  private key: string
  private expiresIn: string
  private EXPIRED_CODE = 'jwt expired'

  constructor(params: { key: string; expiresIn: string }) {
    this.key = params.key
    this.expiresIn = params.expiresIn
  }

  validate(token: string): boolean {
    try {
      const isValid = !!verify(token, this.key)
      return isValid
    } catch (error) {
      if (error.message === this.EXPIRED_CODE) {
        throw new ExpiredTokenException()
      }
      throw new InvalidTokenException()
    }
  }

  encode<T = { email: string; id: string }>(payload: T): string {
    return sign(payload as any, this.key, {
      expiresIn: this.expiresIn,
    })
  }

  decode<T = any>(token: string): T {
    return decode(token) as T
  }
}
