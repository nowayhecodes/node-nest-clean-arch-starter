import { Provider } from '@nestjs/common'
import { ValidateSecurityTokenCommand } from '~/account/application/commands'
import { AccountProviderEnum } from '~/account/infra/ioc/account.provider.enum'
import { IUserRepository } from '~/shared/domain/repositories/tenant/user.repository'
import { ITokenGenerator } from '~/shared/infra/contracts/token-generator'
import { SharedProviderEnum } from '~/shared/infra/ioc/shared-provider.enum'

export class ValidateSecurityTokenCommandProvider {
  static register(): Provider {
    return {
      provide: AccountProviderEnum.COMMANDS.VALIDATE_SECURITY_TOKEN,
      useFactory: async (
        securityTokenGenerator: ITokenGenerator,
        userRepository: IUserRepository,
      ): Promise<ValidateSecurityTokenCommand.Contract> => {
        return new ValidateSecurityTokenCommand(securityTokenGenerator, userRepository)
      },
      inject: [SharedProviderEnum.SECURITY_TOKEN_GENERATOR, SharedProviderEnum.REPOSITORIES.USER_REPOSITORY],
    }
  }
}
