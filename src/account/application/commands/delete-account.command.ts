import { UserNotFoundException } from '~/account/domain/exceptions'
import { BaseCommand } from '~/shared/application/commands/base'
import { EventTypes } from '~/shared/domain/events/event-types'
import { IUserRepository } from '~/shared/domain/repositories/tenant/user.repository'
import { IEventHandler } from '~/shared/infra/contracts/event-handler'

/**
 * GDPR Art. 17 / LGPD Art. 18 — Right to Erasure.
 * Anonymizes all PII fields and soft-deletes the user record.
 * Domain events recorded by User.anonymize() are dispatched after persisting.
 */
export class DeleteAccountCommand implements DeleteAccountCommand.Contract {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly eventHandler: IEventHandler,
  ) {}

  async execute(input: DeleteAccountCommand.Input): DeleteAccountCommand.Output {
    const user = await this.userRepository.findById(input.userId)
    if (!user) throw new UserNotFoundException()

    user.anonymize()
    await this.userRepository.save(user)
    user.pullDomainEvents() // clear domain events after persisting

    await this.eventHandler.send({
      event: EventTypes.ACCOUNT_DELETED,
      payload: { userId: input.userId },
    })
  }
}

export namespace DeleteAccountCommand {
  export interface Contract extends BaseCommand<Input, Output> {}
  export type Input = { userId: string }
  export type Output = Promise<void>
}
