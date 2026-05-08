import { Provider } from '@nestjs/common'
import { RequestResetPasswordCommand } from '~/account/application/commands'
import { AccountProviderEnum } from '~/account/infra/ioc/account.provider.enum'
import { IUserRepository } from '~/shared/domain/repositories/tenant/user.repository'
import { IEventHandler } from '~/shared/infra/contracts/event-handler'
import { ITokenGenerator } from '~/shared/infra/contracts/token-generator'
import { SharedProviderEnum } from '~/shared/infra/ioc/shared-provider.enum'

export class RequestResetPasswordCommandProvider {
  static register(): Provider {
    return {
      provide: AccountProviderEnum.COMMANDS.REQUEST_RESET_PASSWORD,
      useFactory: async (
        userRepository: IUserRepository,
        securityToken: ITokenGenerator,
        eventHandler: IEventHandler,
      ): Promise<RequestResetPasswordCommand.Contract> => {
        return new RequestResetPasswordCommand(userRepository, securityToken, eventHandler)
      },
      inject: [
        SharedProviderEnum.REPOSITORIES.USER_REPOSITORY,
        SharedProviderEnum.SECURITY_TOKEN_GENERATOR,
        SharedProviderEnum.EVENT_HANDLER,
      ],
    }
  }
}
