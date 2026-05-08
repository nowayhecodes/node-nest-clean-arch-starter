import { Provider } from '@nestjs/common'
import { CreateAccountCommand } from '~/account/application/commands'
import { AccountProviderEnum } from '~/account/infra/ioc/account.provider.enum'
import { IUserRepository } from '~/shared/domain/repositories/tenant/user.repository'
import { IEventHandler } from '~/shared/infra/contracts/event-handler'
import { IHashGenerator } from '~/shared/infra/contracts/hash-generator'
import { ITokenGenerator } from '~/shared/infra/contracts/token-generator'
import { SharedProviderEnum } from '~/shared/infra/ioc/shared-provider.enum'

export class CreateAccountCommandProvider {
  static register(): Provider {
    return {
      provide: AccountProviderEnum.COMMANDS.CREATE_ACCOUNT,
      useFactory: async (
        userRepository: IUserRepository,
        hashGenerator: IHashGenerator,
        eventHandler: IEventHandler,
        securityTokenGenerator: ITokenGenerator,
      ): Promise<CreateAccountCommand.Contract> => {
        return new CreateAccountCommand(userRepository, hashGenerator, eventHandler, securityTokenGenerator)
      },
      inject: [
        SharedProviderEnum.REPOSITORIES.USER_REPOSITORY,
        SharedProviderEnum.HASH_GENERATOR,
        SharedProviderEnum.EVENT_HANDLER,
        SharedProviderEnum.SECURITY_TOKEN_GENERATOR,
      ],
    }
  }
}
