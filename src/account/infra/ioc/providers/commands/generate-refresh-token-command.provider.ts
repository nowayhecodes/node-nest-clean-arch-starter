import { Provider } from '@nestjs/common'
import { GenerateRefreshTokenCommand } from '~/account/application/commands'
import { AccountProviderEnum } from '~/account/infra/ioc/account.provider.enum'
import { IUserRepository } from '~/shared/domain/repositories/tenant/user.repository'
import { ITokenGenerator } from '~/shared/infra/contracts/token-generator'
import { SharedProviderEnum } from '~/shared/infra/ioc/shared-provider.enum'

export class GenerateRefreshTokenProvider {
  static register(): Provider {
    return {
      provide: AccountProviderEnum.COMMANDS.GENERATE_REFRESH_TOKEN,
      useFactory: async (
        userRepository: IUserRepository,
        accessToken: ITokenGenerator,
        refreshToken: ITokenGenerator,
      ): Promise<GenerateRefreshTokenCommand.Contract> => {
        return new GenerateRefreshTokenCommand(userRepository, accessToken, refreshToken)
      },
      inject: [
        SharedProviderEnum.REPOSITORIES.USER_REPOSITORY,
        SharedProviderEnum.ACCESS_TOKEN_GENERATOR,
        SharedProviderEnum.REFRESH_TOKEN_GENERATOR,
      ],
    }
  }
}
