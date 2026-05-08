import { Provider } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { ITokenGenerator } from '~/shared/infra/contracts/token-generator'
import { SharedProviderEnum } from '~/shared/infra/ioc/shared-provider.enum'
import { JwtTokenGeneratorAdapter } from '~/shared/infra/token/jwt-token-generator.adapter'

export class AccessTokenGeneratorProvider {
  static register(): Provider {
    return {
      provide: SharedProviderEnum.ACCESS_TOKEN_GENERATOR,
      useFactory: async (configService: ConfigService): Promise<ITokenGenerator> => {
        return new JwtTokenGeneratorAdapter({
          key: configService.getOrThrow('JWT_TOKEN_SECRET'),
          expiresIn: configService.getOrThrow('ACCESS_TOKEN_EXPIRATION'),
        })
      },
      inject: [ConfigService],
    }
  }
}
