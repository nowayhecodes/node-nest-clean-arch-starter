import { UserNotFoundException } from '~/account/domain/exceptions'
import { BaseCommand } from '~/shared/application/commands/base'
import { IUserRepository } from '~/shared/domain/repositories/tenant/user.repository'
import { ITokenGenerator } from '~/shared/infra/contracts/token-generator'

export class GenerateRefreshTokenCommand implements GenerateRefreshTokenCommand.Contract {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly accessTokenGenerator: ITokenGenerator,
    private readonly refreshTokenGenerator: ITokenGenerator,
  ) {}

  async execute(input: GenerateRefreshTokenCommand.Input): GenerateRefreshTokenCommand.Output {
    this.refreshTokenGenerator.validate(input.refreshToken)
    const { id: userId } = this.refreshTokenGenerator.decode(input.refreshToken)

    const user = await this.userRepository.findById(userId)
    if (!user) throw new UserNotFoundException()

    const payload: ITokenGenerator.Payload = { id: user.id, email: user.email }

    return {
      accessToken: this.accessTokenGenerator.encode(payload),
      refreshToken: this.refreshTokenGenerator.encode(payload),
    }
  }
}

export namespace GenerateRefreshTokenCommand {
  export interface Contract extends BaseCommand<Input, Output> {}
  export type Input = { refreshToken: string }
  export type Output = Promise<{ accessToken: string; refreshToken: string }>
}
