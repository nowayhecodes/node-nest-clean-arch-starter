import { UserNotFoundException } from '~/account/domain/exceptions'
import { IUserRepository } from '~/shared/domain/repositories/tenant/user.repository'
import { ITokenGenerator } from '~/shared/infra/contracts/token-generator'

export class ValidateSecurityTokenCommand implements ValidateSecurityTokenCommand.Contract {
  constructor(
    private readonly securityTokenGenerator: ITokenGenerator,
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(input: ValidateSecurityTokenCommand.Input): ValidateSecurityTokenCommand.Output {
    this.securityTokenGenerator.validate(input.securityToken)
    const payload = this.securityTokenGenerator.decode(input.securityToken)

    const user = await this.userRepository.findById(payload.id)
    if (!user) throw new UserNotFoundException()

    return { isValid: user.securityTokenIsValid(input.securityToken) }
  }
}

export namespace ValidateSecurityTokenCommand {
  export interface Contract {
    execute(input: Input): Output
  }
  export type Input = { securityToken: string }
  export type Output = Promise<{ isValid: boolean }>
}
