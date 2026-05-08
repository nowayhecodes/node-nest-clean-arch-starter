export interface ITokenGenerator {
  encode(payload: ITokenGenerator.Payload): string
  decode(token: string): ITokenGenerator.Payload & { iat: number; exp: number }
  validate(token: string, revokedAt?: number): boolean
}

export namespace ITokenGenerator {
  export type Payload = {
    tenantId?: string
    id: string
    email: string
  }
}
