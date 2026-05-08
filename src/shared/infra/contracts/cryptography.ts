export interface ICryptography {
  encrypt(value: string): string
  decrypt(value: string): string
}
