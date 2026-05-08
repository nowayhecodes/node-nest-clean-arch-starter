import { EventTypes } from '~/shared/domain/events/event-types'

export interface IEventHandler {
  send<T = any>(input: IEventHandler.SendInput<T>): Promise<void>
  listen<T = any>(input: IEventHandler.ListenInput<T>): Promise<void>
}

export namespace IEventHandler {
  export type SendInput<T> = Payload<T>
  export type ListenInput<T> = {
    key: EventTypes
    handler: (payload: T) => Promise<any>
  }
  export type Payload<T = any> = {
    event: EventTypes
    payload: T
  }
}
