import { Logger, Provider } from '@nestjs/common'
import { AccountCreatedNotification } from '~/notification/application/consumers/account-created.notification'
import { NotificationProviderEnum } from '~/notification/infra/ioc/notification-provider.enum'
import { EventTypes } from '~/shared/domain/events/event-types'
import { IEmailHandler } from '~/shared/infra/contracts/email-handler'
import { IEventHandler } from '~/shared/infra/contracts/event-handler'
import { SharedProviderEnum } from '~/shared/infra/ioc/shared-provider.enum'

export class AccountCreatedNotificationProvider {
  static register(): Provider {
    return {
      provide: NotificationProviderEnum.CONSUMERS.ACCOUNT_CREATED_NOTIFICATION,
      useFactory: async (
        emailHandler: IEmailHandler,
        eventHandler: IEventHandler,
      ): Promise<AccountCreatedNotification.Contract> => {
        const logger = new Logger()
        const handler = new AccountCreatedNotification(emailHandler)
        await eventHandler.listen({
          handler: async (payload) => {
            logger.debug(`INTERNAL EVENT RECEIVED`, EventTypes.ACCOUNT_CONFIRMATION)
            await handler.execute(payload)
          },
          key: EventTypes.ACCOUNT_CONFIRMATION,
        })
        return handler
      },
      inject: [SharedProviderEnum.EMAIL_HANDLER, SharedProviderEnum.EVENT_HANDLER],
    }
  }
}
