import { Provider } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { ITokenGenerator } from '~/shared/infra/contracts/token-generator'
import { SharedProviderEnum } from '~/shared/infra/ioc/shared-provider.enum'
import { JwtTokenGeneratorAdapter } from '~/shared/infra/token/jwt-token-generator.adapter'

export class RefreshTokenGeneratorProvider {
  static register(): Provider {
    return {
      provide: SharedProviderEnum.REFRESH_TOKEN_GENERATOR,
      useFactory: async (configService: ConfigService): Promise<ITokenGenerator> => {
        return new JwtTokenGeneratorAdapter({
          key: configService.getOrThrow('JWT_TOKEN_SECRET'),
          expiresIn: configService.getOrThrow('REFRESH_TOKEN_EXPIRATION'),
        })
      },
      inject: [ConfigService],
    }
  }
}
