import { Provider } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { ICryptography } from '~/shared/infra/contracts/cryptography'
import { NodeCryptoAdapter } from '~/shared/infra/crypto/node-crypto.adapter'
import { SharedProviderEnum } from '~/shared/infra/ioc/shared-provider.enum'

export class CryptographyProvider {
  static register(): Provider {
    return {
      provide: SharedProviderEnum.CRYPTOGRAPHY,
      useFactory: async (configService: ConfigService): Promise<ICryptography> => {
        return new NodeCryptoAdapter({
          iv: configService.getOrThrow('CRYPTO_IV_KEY'),
          secretKey: configService.getOrThrow('CRYPTO_SECRET_KEY'),
        })
      },
      inject: [ConfigService],
    }
  }
}
