import { randomBytes, scryptSync, timingSafeEqual } from 'crypto'
import { IHashGenerator } from '~/shared/infra/contracts/hash-generator'

export class NodeCryptoHashAdapter implements IHashGenerator {
  private readonly SALT_LENGTH = 32
  private readonly KEY_LENGTH = 64

  hash(value: string): string {
    const salt = randomBytes(this.SALT_LENGTH).toString('hex')
    const hash = scryptSync(value, salt, this.KEY_LENGTH).toString('hex')
    return `${salt}:${hash}`
  }

  compare(value: string, hash: string): boolean {
    const [salt, storedHash] = hash.split(':')
    const hashedValue = scryptSync(value, salt, this.KEY_LENGTH).toString('hex')
    return timingSafeEqual(Buffer.from(hashedValue), Buffer.from(storedHash))
  }
}
