import { DomainEvent } from '~/shared/domain/events/domain-event'

export class AccountDeletedEvent implements DomainEvent {
  readonly eventName = 'AccountDeleted'
  readonly occurredAt = new Date()

  constructor(readonly userId: string) {}
}
