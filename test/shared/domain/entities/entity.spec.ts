import { AggregateRoot } from '~/shared/domain/entities/aggregate-root'

class ConcreteAggregate extends AggregateRoot {}

describe('DomainEntity (via AggregateRoot)', () => {
  describe('constructor', () => {
    it('generates a UUID when no id is provided', () => {
      const entity = new ConcreteAggregate()
      expect(entity.id).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/)
    })

    it('uses the provided id', () => {
      const id = 'b1b1b1b1-b1b1-b1b1-b1b1-b1b1b1b1b1b1'
      const entity = new ConcreteAggregate({ id })
      expect(entity.id).toBe(id)
    })

    it('defaults alternativeId to 0 when not provided', () => {
      const entity = new ConcreteAggregate()
      expect(entity.alternativeId).toBe(0)
    })

    it('uses the provided alternativeId', () => {
      const entity = new ConcreteAggregate({ alternativeId: 42 })
      expect(entity.alternativeId).toBe(42)
    })

    it('defaults createdDate to now when not provided', () => {
      const before = new Date()
      const entity = new ConcreteAggregate()
      const after = new Date()
      expect(entity.createdDate.getTime()).toBeGreaterThanOrEqual(before.getTime())
      expect(entity.createdDate.getTime()).toBeLessThanOrEqual(after.getTime())
    })

    it('uses the provided createdDate', () => {
      const createdDate = new Date('2024-01-01')
      const entity = new ConcreteAggregate({ createdDate })
      expect(entity.createdDate).toBe(createdDate)
    })

    it('defaults updatedDate to null', () => {
      const entity = new ConcreteAggregate()
      expect(entity.updatedDate).toBeNull()
    })

    it('uses the provided updatedDate', () => {
      const updatedDate = new Date('2024-06-01')
      const entity = new ConcreteAggregate({ updatedDate })
      expect(entity.updatedDate).toBe(updatedDate)
    })

    it('defaults deletedDate to null', () => {
      const entity = new ConcreteAggregate()
      expect(entity.deletedDate).toBeNull()
    })

    it('uses the provided deletedDate', () => {
      const deletedDate = new Date('2024-12-01')
      const entity = new ConcreteAggregate({ deletedDate })
      expect(entity.deletedDate).toBe(deletedDate)
    })
  })

  describe('update()', () => {
    it('sets updatedDate to a recent timestamp', () => {
      const entity = new ConcreteAggregate()
      const before = new Date()
      entity.update()
      const after = new Date()
      expect(entity.updatedDate!.getTime()).toBeGreaterThanOrEqual(before.getTime())
      expect(entity.updatedDate!.getTime()).toBeLessThanOrEqual(after.getTime())
    })
  })

  describe('delete()', () => {
    it('sets deletedDate to a recent timestamp', () => {
      const entity = new ConcreteAggregate()
      const before = new Date()
      entity.delete()
      const after = new Date()
      expect(entity.deletedDate!.getTime()).toBeGreaterThanOrEqual(before.getTime())
      expect(entity.deletedDate!.getTime()).toBeLessThanOrEqual(after.getTime())
    })
  })

  describe('pullDomainEvents()', () => {
    it('returns empty array when no events recorded', () => {
      const entity = new ConcreteAggregate()
      expect(entity.pullDomainEvents()).toEqual([])
    })

    it('clears events after pulling', () => {
      const entity = new ConcreteAggregate()
      entity.pullDomainEvents()
      expect(entity.pullDomainEvents()).toEqual([])
    })
  })
})
