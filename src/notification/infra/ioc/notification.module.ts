import { Module } from '@nestjs/common'
import { AccountCreatedNotificationProvider } from '~/notification/infra/ioc/providers/consumers/account-created-notification.provider'
import { ResetPasswordNotificationProvider } from '~/notification/infra/ioc/providers/consumers/reset-password-notification.provider'
import { WelcomeNotificationProvider } from '~/notification/infra/ioc/providers/consumers/welcome-notification.provider'

@Module({
  imports: [],
  controllers: [],
  providers: [
    AccountCreatedNotificationProvider.register(),
    ResetPasswordNotificationProvider.register(),
    WelcomeNotificationProvider.register(),
  ],
})
export class NotificationModule {}
