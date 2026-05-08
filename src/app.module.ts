import { Module } from '@nestjs/common'
import { AccountModule } from '~/account/infra/ioc/account.module'
import { NotificationModule } from '~/notification/infra/ioc/notification.module'
import { SharedModule } from '~/shared/infra/ioc/shared.module'

@Module({
  imports: [SharedModule, AccountModule, NotificationModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
