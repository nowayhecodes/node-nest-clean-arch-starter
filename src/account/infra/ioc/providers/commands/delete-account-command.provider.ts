import { Provider } from '@nestjs/common'
import { DeleteAccountCommand } from '~/account/application/commands'
import { AccountProviderEnum } from '~/account/infra/ioc/account.provider.enum'
import { IUserRepository } from '~/shared/domain/repositories/tenant/user.repository'
import { IEventHandler } from '~/shared/infra/contracts/event-handler'
import { SharedProviderEnum } from '~/shared/infra/ioc/shared-provider.enum'

export class DeleteAccountCommandProvider {
  static register(): Provider {
    return {
      provide: AccountProviderEnum.COMMANDS.DELETE_ACCOUNT,
      useFactory: async (
        userRepository: IUserRepository,
        eventHandler: IEventHandler,
      ): Promise<DeleteAccountCommand.Contract> => {
        return new DeleteAccountCommand(userRepository, eventHandler)
      },
      inject: [SharedProviderEnum.REPOSITORIES.USER_REPOSITORY, SharedProviderEnum.EVENT_HANDLER],
    }
  }
}
