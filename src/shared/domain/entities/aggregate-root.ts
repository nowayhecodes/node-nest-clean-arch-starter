import { DomainEvent } from '~/shared/domain/events/domain-event'
import { DomainEntity } from '~/shared/domain/entities/entity'

/**
 * Base class for Aggregate Roots.
 *
 * Extends DomainEntity with domain-event collection.
 * Entities that act as aggregate roots (User, Tenant) extend this class.
 * The Application layer pulls recorded events after persisting and dispatches them.
 */
export abstract class AggregateRoot extends DomainEntity {
  private _domainEvents: DomainEvent[] = []

  protected addDomainEvent(event: DomainEvent): void {
    this._domainEvents.push(event)
  }

  /** Returns and clears the recorded events — call once after persisting. */
  pullDomainEvents(): DomainEvent[] {
    const events = [...this._domainEvents]
    this._domainEvents = []
    return events
  }
}
