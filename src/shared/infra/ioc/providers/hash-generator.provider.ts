import { Provider } from '@nestjs/common'
import { IHashGenerator } from '~/shared/infra/contracts/hash-generator'
import { NodeCryptoHashAdapter } from '~/shared/infra/hash/node-crypto-hash-generator.adapter'
import { SharedProviderEnum } from '~/shared/infra/ioc/shared-provider.enum'

export class HashGeneratorProvider {
  static register(): Provider {
    return {
      provide: SharedProviderEnum.HASH_GENERATOR,
      useFactory: async (): Promise<IHashGenerator> => {
        return new NodeCryptoHashAdapter()
      },
      inject: [],
    }
  }
}
