import { Provider } from '@nestjs/common'
import { LogoutCommand } from '~/account/application/commands'
import { AccountProviderEnum } from '~/account/infra/ioc/account.provider.enum'
import { IUserRepository } from '~/shared/domain/repositories/tenant/user.repository'
import { SharedProviderEnum } from '~/shared/infra/ioc/shared-provider.enum'

export class LogoutCommandProvider {
  static register(): Provider {
    return {
      provide: AccountProviderEnum.COMMANDS.LOGOUT,
      useFactory: async (userRepository: IUserRepository): Promise<LogoutCommand.Contract> => {
        return new LogoutCommand(userRepository)
      },
      inject: [SharedProviderEnum.REPOSITORIES.USER_REPOSITORY],
    }
  }
}
