import { Logger } from '@nestjs/common'
import { EventEmitter2 } from '@nestjs/event-emitter'
import { IEventHandler } from '~/shared/infra/contracts/event-handler'

export class NestJsEventHandlerAdapter implements IEventHandler {
  private eventEmitter: EventEmitter2
  private logger = new Logger()

  constructor() {
    this.eventEmitter = new EventEmitter2()
  }

  async send<T = any>({ event, payload }: IEventHandler.SendInput<T>): Promise<void> {
    this.logger.debug('INTERNAL EVENT SENT', event)
    await this.eventEmitter.emitAsync(event, payload)
  }

  async listen<T = any>({ key, handler }: IEventHandler.ListenInput<T>): Promise<void> {
    this.logger.debug('INTERNAL EVENT RECEIVED', key)
    this.eventEmitter.on(key, handler, {
      async: true,
      promisify: true,
    })
  }
}
