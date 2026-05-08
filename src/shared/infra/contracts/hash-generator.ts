export interface IHashGenerator {
  hash(value: string): string
  compare(value: string, hash: string): boolean
}
