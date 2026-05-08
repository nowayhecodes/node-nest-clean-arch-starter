import { createCipheriv, createDecipheriv } from 'crypto'
import { ICryptography } from '~/shared/infra/contracts/cryptography'

export class NodeCryptoAdapter implements ICryptography {
  private secretKey: string
  private iv: string

  constructor(props: { secretKey: string; iv: string }) {
    Object.assign(this, props)
  }

  encrypt(value: string): string {
    const cipher = createCipheriv('aes-256-cbc', Buffer.from(this.secretKey, 'hex'), Buffer.from(this.iv, 'hex'))
    let encrypted = cipher.update(value)
    encrypted = Buffer.concat([encrypted, cipher.final()])
    return encrypted.toString('hex')
  }

  decrypt(value: string): string {
    const encryptedText = Buffer.from(value, 'hex')
    const decipher = createDecipheriv('aes-256-cbc', Buffer.from(this.secretKey, 'hex'), Buffer.from(this.iv, 'hex'))
    let decrypted = decipher.update(encryptedText)
    decrypted = Buffer.concat([decrypted, decipher.final()])
    return decrypted.toString()
  }

  // GENERATE NEW SECRET
  //   const secretKey = crypto.randomBytes(32).toString('hex');

  // GENERATE NEW INITIALIZATION VECTOR
  // const iv = crypto.randomBytes(16).toString('hex');
}
