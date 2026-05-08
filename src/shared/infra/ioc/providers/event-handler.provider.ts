import { Provider } from '@nestjs/common'
import { IEventHandler } from '~/shared/infra/contracts/event-handler'
import { NestJsEventHandlerAdapter } from '~/shared/infra/events/nestjs-event-handler.adapter'
import { SharedProviderEnum } from '~/shared/infra/ioc/shared-provider.enum'

export class EventHandlerProvider {
  static register(): Provider {
    return {
      provide: SharedProviderEnum.EVENT_HANDLER,
      useFactory: async (): Promise<IEventHandler> => {
        return new NestJsEventHandlerAdapter()
      },
      inject: [],
    }
  }
}
