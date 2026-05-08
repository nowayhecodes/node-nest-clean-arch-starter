import { DomainEvent } from '~/shared/domain/events/domain-event'

export class AccountCreatedEvent implements DomainEvent {
  readonly eventName = 'AccountCreated'
  readonly occurredAt = new Date()

  constructor(
    readonly userId: string,
    readonly email: string,
    readonly firstName: string,
    readonly language: string,
  ) {}
}
