import { Provider } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { IEmailHandler } from '~/shared/infra/contracts/email-handler'
import { NodeMailerEmailHandlerAdapter } from '~/shared/infra/email/nodemail-email-handler.adapter'
import { SharedProviderEnum } from '~/shared/infra/ioc/shared-provider.enum'

export class EmailHandlerProvider {
  static register(): Provider {
    return {
      provide: SharedProviderEnum.EMAIL_HANDLER,
      useFactory: async (configService: ConfigService): Promise<IEmailHandler> => {
        return new NodeMailerEmailHandlerAdapter({
          host: configService.getOrThrow('MAIL_HOST'),
          port: configService.getOrThrow('MAIL_PORT'),
          user: configService.getOrThrow('MAIL_USER'),
          password: configService.getOrThrow('MAIL_PASS'),
          mailTo: configService.get('MAIL_TO'),
          environment: configService.getOrThrow('ENVIRONMENT'),
          mailFrom: configService.getOrThrow('MAIL_FROM'),
        })
      },
      inject: [ConfigService],
    }
  }
}
