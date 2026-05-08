import { Provider } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { TenantRegisterCommand } from '~/shared/application/commands'
import { ITenantRepository } from '~/shared/domain/repositories/public/tenant.repository'
import { ICryptography } from '~/shared/infra/contracts/cryptography'
import { IEventHandler } from '~/shared/infra/contracts/event-handler'
import { IHashGenerator } from '~/shared/infra/contracts/hash-generator'
import { ITokenGenerator } from '~/shared/infra/contracts/token-generator'
import { SharedProviderEnum } from '~/shared/infra/ioc/shared-provider.enum'

export class TenantRegisterCommandProvider {
  static register(): Provider {
    return {
      provide: SharedProviderEnum.COMMANDS.TENANT_REGISTER_COMMAND,
      useFactory: async (
        configService: ConfigService,
        tenantRepository: ITenantRepository,
        cryptography: ICryptography,
        hashGenerator: IHashGenerator,
        securityTokenGenerator: ITokenGenerator,
        eventHandler: IEventHandler,
      ): Promise<TenantRegisterCommand.Contract> => {
        return new TenantRegisterCommand(
          {
            databaseHost: configService.getOrThrow('DB_HOST'),
            databaseName: configService.getOrThrow('DB_NAME'),
            databasePort: Number(configService.getOrThrow('DB_PORT')),
          },
          tenantRepository,
          cryptography,
          hashGenerator,
          securityTokenGenerator,
          eventHandler,
        )
      },
      inject: [
        ConfigService,
        SharedProviderEnum.REPOSITORIES.TENANT_REPOSITORY,
        SharedProviderEnum.CRYPTOGRAPHY,
        SharedProviderEnum.HASH_GENERATOR,
        SharedProviderEnum.SECURITY_TOKEN_GENERATOR,
        SharedProviderEnum.EVENT_HANDLER,
      ],
    }
  }
}
