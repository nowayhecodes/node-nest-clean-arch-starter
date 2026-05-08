import { randomUUID } from 'crypto'

export class DomainEntity {
  private _id: string
  private _alternativeId: number
  private _createdDate: Date
  private _updatedDate?: Date | null
  private _deletedDate?: Date | null

  constructor(props: Partial<DomainEntity> = {}) {
    this._id = props.id || randomUUID()
    this._alternativeId = props.alternativeId || 0
    this._createdDate = props.createdDate || new Date()
    this._updatedDate = props.updatedDate || null
    this._deletedDate = props.deletedDate || null
  }

  public get id(): string {
    return this._id
  }

  public get alternativeId(): number {
    return this._alternativeId
  }

  public get createdDate(): Date {
    return this._createdDate
  }

  public get updatedDate(): Date | null {
    return this._updatedDate || null
  }

  public get deletedDate(): Date | null {
    return this._deletedDate || null
  }

  public update() {
    this._updatedDate = new Date()
  }

  public delete() {
    this._deletedDate = new Date()
  }
}
