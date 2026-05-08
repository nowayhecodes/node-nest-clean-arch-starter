import { BaseCommand } from '~/shared/application/commands/base'
import { EventTypes } from '~/shared/domain/events/event-types'
import { IUserRepository } from '~/shared/domain/repositories/tenant/user.repository'
import { IEventHandler } from '~/shared/infra/contracts/event-handler'
import { ITokenGenerator } from '~/shared/infra/contracts/token-generator'

export class RequestResetPasswordCommand implements RequestResetPasswordCommand.Contract {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly securityToken: ITokenGenerator,
    private readonly eventHandler: IEventHandler,
  ) {}

  async execute(input: RequestResetPasswordCommand.Input): RequestResetPasswordCommand.Output {
    const user = await this.userRepository.findByEmail(input.email)
    // Silent success — never reveal whether the email is registered (OWASP A07)
    if (!user) return

    const securityToken = this.securityToken.encode({
      id: user.id,
      email: user.email,
      tenantId: input.tenantId,
    })
    user.updateSecurityToken(securityToken)
    await this.userRepository.save(user)
    await this.eventHandler.send({
      event: EventTypes.RESET_PASSWORD,
      payload: {
        email: user.email,
        firstName: user.firstName,
        url: `${input.tenantUrl}/password-reset?securityToken=${securityToken}`,
        language: user.language,
      },
    })
  }
}

export namespace RequestResetPasswordCommand {
  export interface Contract extends BaseCommand<Input, Output> {}
  export type Input = {
    email: string
    tenantId: string
    tenantUrl: string
  }
  export type Output = Promise<void>
}
