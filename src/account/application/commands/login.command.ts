import { BaseCommand } from '~/shared/application/commands/base'
import { IUserRepository } from '~/shared/domain/repositories/tenant/user.repository'
import { InvalidCredentialsException } from '~/shared/domain/exceptions'
import { IHashGenerator } from '~/shared/infra/contracts/hash-generator'
import { ILoginPolicy } from '~/shared/infra/contracts/login-policy'
import { ITokenGenerator } from '~/shared/infra/contracts/token-generator'

export class LoginCommand implements LoginCommand.Contract {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly hashGenerator: IHashGenerator,
    private readonly accessTokenGenerator: ITokenGenerator,
    private readonly refreshTokenGenerator: ITokenGenerator,
    private readonly loginPolicy: ILoginPolicy,
  ) {}

  async execute(input: LoginCommand.Input): LoginCommand.Output {
    const user = await this.userRepository.findByEmail(input.email)
    if (!user) throw new InvalidCredentialsException()

    const isPasswordValid = this.hashGenerator.compare(input.password, user.passwordHash)

    user.login({
      isPasswordValid,
      failedTimesBlock: this.loginPolicy.maxAttempts,
      blockedAccessTime: this.loginPolicy.lockoutMinutes,
      needEmailConfirm: this.loginPolicy.requireEmailConfirmation,
    })

    await this.userRepository.save(user)

    const payload: ITokenGenerator.Payload = { id: user.id, email: user.email }

    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      accessToken: this.accessTokenGenerator.encode(payload),
      refreshToken: this.refreshTokenGenerator.encode(payload),
    }
  }
}

export namespace LoginCommand {
  export interface Contract extends BaseCommand<Input, Output> {}
  export type Input = {
    email: string
    password: string
  }
  export type Output = Promise<{
    id: string
    firstName: string
    lastName: string
    email: string
    accessToken: string
    refreshToken: string
  }>
}
