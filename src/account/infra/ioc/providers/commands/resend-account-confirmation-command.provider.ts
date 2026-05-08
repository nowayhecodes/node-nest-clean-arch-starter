import { Provider } from '@nestjs/common'
import { ResendAccountConfirmationCommand } from '~/account/application/commands'
import { AccountProviderEnum } from '~/account/infra/ioc/account.provider.enum'
import { IUserRepository } from '~/shared/domain/repositories/tenant/user.repository'
import { IEventHandler } from '~/shared/infra/contracts/event-handler'
import { ITokenGenerator } from '~/shared/infra/contracts/token-generator'
import { SharedProviderEnum } from '~/shared/infra/ioc/shared-provider.enum'

export class ResendAccountConfirmationCommandProvider {
  static register(): Provider {
    return {
      provide: AccountProviderEnum.COMMANDS.RESEND_ACCOUNT_CONFIRMATION,
      useFactory: async (
        securityTokenGenerator: ITokenGenerator,
        userRepository: IUserRepository,
        eventHandler: IEventHandler,
      ): Promise<ResendAccountConfirmationCommand.Contract> => {
        return new ResendAccountConfirmationCommand(securityTokenGenerator, userRepository, eventHandler)
      },
      inject: [
        SharedProviderEnum.SECURITY_TOKEN_GENERATOR,
        SharedProviderEnum.REPOSITORIES.USER_REPOSITORY,
        SharedProviderEnum.EVENT_HANDLER,
      ],
    }
  }
}
