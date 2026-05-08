import { UserNotFoundException, WrongSecurityTokenException } from '~/account/domain/exceptions'
import { EventTypes } from '~/shared/domain/events/event-types'
import { IUserRepository } from '~/shared/domain/repositories/tenant/user.repository'
import { IEventHandler } from '~/shared/infra/contracts/event-handler'
import { ITokenGenerator } from '~/shared/infra/contracts/token-generator'

export class ConfirmAccountCommand implements ConfirmAccountCommand.Contract {
  constructor(
    private readonly securityTokenGenerator: ITokenGenerator,
    private readonly userRepository: IUserRepository,
    private readonly eventHandler: IEventHandler,
  ) {}

  async execute(input: ConfirmAccountCommand.Input): ConfirmAccountCommand.Output {
    this.securityTokenGenerator.validate(input.securityToken)
    const payload = this.securityTokenGenerator.decode(input.securityToken)

    const user = await this.userRepository.findById(payload.id)
    if (!user) throw new UserNotFoundException()
    if (!user.securityTokenIsValid(input.securityToken)) throw new WrongSecurityTokenException()

    user.confirmAccount()
    await this.userRepository.save(user)

    await this.eventHandler.send({
      event: EventTypes.WELCOME,
      payload: {
        email: user.email,
        language: user.language,
        url: `${input.tenantUrl}/login`,
      },
    })
  }
}

export namespace ConfirmAccountCommand {
  export interface Contract {
    execute(input: Input): Output
  }
  export type Input = { securityToken: string; tenantUrl: string }
  export type Output = Promise<void>
}
