import { Global, Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { AuditLogService } from '~/shared/infra/audit/audit-log.service'
import { ThrottlerModule, ThrottlerModuleOptions } from '@nestjs/throttler'
import dotenv from 'dotenv'
import { validate } from '~/shared/infra/config/env.validation'
import { JwtAuthGuard } from '~/shared/infra/guards/jwt-auth.guard'
import { AccessTokenGeneratorProvider } from '~/shared/infra/ioc/providers/access-token-generator.provider'
import { TenantRegisterCommandProvider } from '~/shared/infra/ioc/providers/commands'
import { ConnectionManagerProvider } from '~/shared/infra/ioc/providers/connection-manager.provider'
import { CryptographyProvider } from '~/shared/infra/ioc/providers/cryptography.provider'
import { EmailHandlerProvider } from '~/shared/infra/ioc/providers/email-handler.provider'
import { EventHandlerProvider } from '~/shared/infra/ioc/providers/event-handler.provider'
import { HashGeneratorProvider } from '~/shared/infra/ioc/providers/hash-generator.provider'
import { PrivateFileSystemProvider } from '~/shared/infra/ioc/providers/private-file-system.provider'
import { PublicDatabaseConnectionProvider } from '~/shared/infra/ioc/providers/public-database-connection.provider'
import { PublicFileSystemProvider } from '~/shared/infra/ioc/providers/public-file-system.provider'
import { GetTenantByIdQueryProvider } from '~/shared/infra/ioc/providers/queries'
import { GetTenantByHeaderProvider } from '~/shared/infra/ioc/providers/queries/get-tenant-by-header.query.provider'
import { LoginPolicyProvider } from '~/shared/infra/ioc/providers/login-policy.provider'
import { RefreshTokenGeneratorProvider } from '~/shared/infra/ioc/providers/refresh-token-generator.provider'
import { TenantRepositoryProvider } from '~/shared/infra/ioc/providers/repositories/tenant-repository.provider'
import { UserRepositoryProvider } from '~/shared/infra/ioc/providers/repositories/user-repository.provider'
import { SecurityTokenGeneratorProvider } from '~/shared/infra/ioc/providers/security-token-generator.provider'
import { TenantDatabaseConnectionProvider } from '~/shared/infra/ioc/providers/tenant-database-connection.provider'
import { ThrottlerProvider } from '~/shared/infra/ioc/providers/throttler.provider'
import { AuthMiddleware } from '~/shared/infra/middlewares/auth.middleware'
import { TenantController } from '~/shared/presentation/controller/tenant.controller'
dotenv.config()

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate,
      envFilePath: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
    }),
    ThrottlerModule.forRootAsync({
      useFactory: async (configService: ConfigService): Promise<ThrottlerModuleOptions> => {
        return [
          {
            ttl: configService.getOrThrow('THROTTLER_TTL'),
            limit: configService.getOrThrow('THROTTLER_LIMIT'),
          },
        ]
      },
      inject: [ConfigService],
    }),
  ],
  providers: [
    JwtAuthGuard,
    AuthMiddleware,
    ThrottlerProvider.register(),
    PublicDatabaseConnectionProvider.register(),
    TenantDatabaseConnectionProvider.register(),
    GetTenantByIdQueryProvider.register(),
    CryptographyProvider.register(),
    ConnectionManagerProvider.register(),
    HashGeneratorProvider.register(),
    AccessTokenGeneratorProvider.register(),
    RefreshTokenGeneratorProvider.register(),
    SecurityTokenGeneratorProvider.register(),
    UserRepositoryProvider.register(),
    EventHandlerProvider.register(),
    EmailHandlerProvider.register(),
    PrivateFileSystemProvider.register(),
    PublicFileSystemProvider.register(),
    GetTenantByHeaderProvider.register(),
    TenantRepositoryProvider.register(),
    TenantRegisterCommandProvider.register(),
    LoginPolicyProvider,
    AuditLogService,
  ],
  exports: [
    JwtAuthGuard,
    AuthMiddleware,
    PublicDatabaseConnectionProvider.register(),
    TenantDatabaseConnectionProvider.register(),
    GetTenantByIdQueryProvider.register(),
    CryptographyProvider.register(),
    ConnectionManagerProvider.register(),
    HashGeneratorProvider.register(),
    AccessTokenGeneratorProvider.register(),
    RefreshTokenGeneratorProvider.register(),
    SecurityTokenGeneratorProvider.register(),
    UserRepositoryProvider.register(),
    EventHandlerProvider.register(),
    EmailHandlerProvider.register(),
    PrivateFileSystemProvider.register(),
    PublicFileSystemProvider.register(),
    GetTenantByHeaderProvider.register(),
    TenantRepositoryProvider.register(),
    TenantRegisterCommandProvider.register(),
    LoginPolicyProvider,
  ],
  controllers: [TenantController],
})
export class SharedModule {}
