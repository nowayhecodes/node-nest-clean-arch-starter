export interface ILoginPolicy {
  readonly maxAttempts: number
  readonly lockoutMinutes: number
  readonly requireEmailConfirmation: boolean
}
