import { UserNotFoundException } from '~/account/domain/exceptions'
import { EventTypes } from '~/shared/domain/events/event-types'
import { EmailAlreadyConfirmedException } from '~/shared/domain/exceptions'
import { IUserRepository } from '~/shared/domain/repositories/tenant/user.repository'
import { IEventHandler } from '~/shared/infra/contracts/event-handler'
import { ITokenGenerator } from '~/shared/infra/contracts/token-generator'

export class ResendAccountConfirmationCommand implements ResendAccountConfirmationCommand.Contract {
  constructor(
    private readonly securityTokenGenerator: ITokenGenerator,
    private readonly userRepository: IUserRepository,
    private readonly eventHandler: IEventHandler,
  ) {}

  async execute(input: ResendAccountConfirmationCommand.Input): ResendAccountConfirmationCommand.Output {
    const user = await this.userRepository.findByEmail(input.email)
    if (!user) throw new UserNotFoundException()
    if (user.accountIsVerified()) throw new EmailAlreadyConfirmedException()

    const securityToken = this.securityTokenGenerator.encode({
      id: user.id,
      email: user.email,
    })
    user.updateSecurityToken(securityToken)
    await this.userRepository.save(user)
    await this.eventHandler.send({
      event: EventTypes.ACCOUNT_CONFIRMATION,
      payload: {
        email: user.email,
        firstName: user.firstName,
        url: `${input.tenantUrl}/confirm-email?securityToken=${securityToken}`,
        language: user.language,
      },
    })
  }
}

export namespace ResendAccountConfirmationCommand {
  export interface Contract {
    execute(input: Input): Output
  }
  export type Input = { email: string; tenantUrl: string }
  export type Output = Promise<void>
}
