import { UserNotFoundException, WrongSecurityTokenException } from '~/account/domain/exceptions'
import { IUserRepository } from '~/shared/domain/repositories/tenant/user.repository'
import { IHashGenerator } from '~/shared/infra/contracts/hash-generator'
import { ITokenGenerator } from '~/shared/infra/contracts/token-generator'

export class ConfirmPasswordResetCommand implements ConfirmPasswordResetCommand.Contract {
  constructor(
    private readonly securityTokenGenerator: ITokenGenerator,
    private readonly userRepository: IUserRepository,
    private readonly hashGenerator: IHashGenerator,
  ) {}

  async execute(input: ConfirmPasswordResetCommand.Input): ConfirmPasswordResetCommand.Output {
    this.securityTokenGenerator.validate(input.securityToken)
    const payload = this.securityTokenGenerator.decode(input.securityToken)

    const user = await this.userRepository.findById(payload.id)
    if (!user) throw new UserNotFoundException()
    if (!user.securityTokenIsValid(input.securityToken)) throw new WrongSecurityTokenException()

    const passwordHash = this.hashGenerator.hash(input.password)
    user.updatePasswordHashAndSecurityToken({
      passwordHash,
      securityToken: null,
      password: input.password,
    })
    await this.userRepository.save(user)
  }
}

export namespace ConfirmPasswordResetCommand {
  export interface Contract {
    execute(input: Input): Output
  }
  export type Input = { securityToken: string; password: string }
  export type Output = Promise<void>
}
