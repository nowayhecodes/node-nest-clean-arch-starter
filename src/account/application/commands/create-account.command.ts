import { randomUUID } from 'crypto'
import { ConsentNotAcceptedException, EmailAlreadyExistException } from '~/account/domain/exceptions'
import { BaseCommand } from '~/shared/application/commands/base'
import { User } from '~/shared/domain/entities'
import { EventTypes } from '~/shared/domain/events/event-types'
import { AccountCreatedNotificationPayload } from '~/shared/domain/events/types'
import { IUserRepository } from '~/shared/domain/repositories/tenant/user.repository'
import { IEventHandler } from '~/shared/infra/contracts/event-handler'
import { IHashGenerator } from '~/shared/infra/contracts/hash-generator'
import { ITokenGenerator } from '~/shared/infra/contracts/token-generator'

export class CreateAccountCommand implements CreateAccountCommand.Contract {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly hashGenerator: IHashGenerator,
    private readonly eventHandler: IEventHandler,
    private readonly securityTokenGenerator: ITokenGenerator,
  ) {}

  async execute(input: CreateAccountCommand.Input): CreateAccountCommand.Output {
    if (!input.consentAccepted) throw new ConsentNotAcceptedException()

    const existing = await this.userRepository.findByEmail(input.email)
    if (existing) throw new EmailAlreadyExistException()

    const userId = randomUUID()
    const passwordHash = this.hashGenerator.hash(input.password)
    const securityToken = this.securityTokenGenerator.encode({
      id: userId,
      email: input.email,
    })

    const user = User.create({
      id: userId,
      email: input.email,
      firstName: input.firstName,
      lastName: input.lastName,
      language: input.language ?? 'en-US',
      timezone: input.timezone ?? 'UTC',
      password: input.password,
      passwordHash,
      securityToken,
      consentDate: new Date(),
    })

    await this.userRepository.save(user)
    user.pullDomainEvents() // clear domain events after persisting

    await this.eventHandler.send<AccountCreatedNotificationPayload>({
      event: EventTypes.ACCOUNT_CONFIRMATION,
      payload: {
        email: user.email,
        firstName: user.firstName,
        url: `${input.tenantUrl}/confirm-email?securityToken=${securityToken}`,
        language: user.language,
      },
    })

    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    }
  }
}

export namespace CreateAccountCommand {
  export interface Contract extends BaseCommand<Input, Output> {}
  export type Input = {
    email: string
    password: string
    firstName: string
    lastName: string
    language?: string
    timezone?: string
    tenantUrl: string
    /** GDPR / LGPD — must be true; command throws if false */
    consentAccepted: boolean
  }
  export type Output = Promise<{
    id: string
    email: string
    firstName: string
    lastName: string
  }>
}
