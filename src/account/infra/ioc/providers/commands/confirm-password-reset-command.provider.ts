import { Provider } from '@nestjs/common'
import { ConfirmPasswordResetCommand } from '~/account/application/commands'
import { AccountProviderEnum } from '~/account/infra/ioc/account.provider.enum'
import { IUserRepository } from '~/shared/domain/repositories/tenant/user.repository'
import { IHashGenerator } from '~/shared/infra/contracts/hash-generator'
import { ITokenGenerator } from '~/shared/infra/contracts/token-generator'
import { SharedProviderEnum } from '~/shared/infra/ioc/shared-provider.enum'

export class ConfirmPasswordResetCommandProvider {
  static register(): Provider {
    return {
      provide: AccountProviderEnum.COMMANDS.CONFIRM_PASSWORD_RESET,
      useFactory: async (
        securityTokenGenerator: ITokenGenerator,
        userRepository: IUserRepository,
        hashGenerator: IHashGenerator,
      ): Promise<ConfirmPasswordResetCommand.Contract> => {
        return new ConfirmPasswordResetCommand(securityTokenGenerator, userRepository, hashGenerator)
      },
      inject: [
        SharedProviderEnum.SECURITY_TOKEN_GENERATOR,
        SharedProviderEnum.REPOSITORIES.USER_REPOSITORY,
        SharedProviderEnum.HASH_GENERATOR,
      ],
    }
  }
}
