import { Provider } from '@nestjs/common'
import { LoginCommand } from '~/account/application/commands/login.command'
import { AccountProviderEnum } from '~/account/infra/ioc/account.provider.enum'
import { IUserRepository } from '~/shared/domain/repositories/tenant/user.repository'
import { IHashGenerator } from '~/shared/infra/contracts/hash-generator'
import { ILoginPolicy } from '~/shared/infra/contracts/login-policy'
import { ITokenGenerator } from '~/shared/infra/contracts/token-generator'
import { SharedProviderEnum } from '~/shared/infra/ioc/shared-provider.enum'

export class LoginCommandProvider {
  static register(): Provider {
    return {
      provide: AccountProviderEnum.COMMANDS.LOGIN,
      useFactory: (
        userRepository: IUserRepository,
        hashGenerator: IHashGenerator,
        accessToken: ITokenGenerator,
        refreshToken: ITokenGenerator,
        loginPolicy: ILoginPolicy,
      ): LoginCommand.Contract => {
        return new LoginCommand(userRepository, hashGenerator, accessToken, refreshToken, loginPolicy)
      },
      inject: [
        SharedProviderEnum.REPOSITORIES.USER_REPOSITORY,
        SharedProviderEnum.HASH_GENERATOR,
        SharedProviderEnum.ACCESS_TOKEN_GENERATOR,
        SharedProviderEnum.REFRESH_TOKEN_GENERATOR,
        SharedProviderEnum.LOGIN_POLICY,
      ],
    }
  }
}
