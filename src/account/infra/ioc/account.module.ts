import { Module } from '@nestjs/common'
import {
  ConfirmAccountCommandProvider,
  ConfirmPasswordResetCommandProvider,
  CreateAccountCommandProvider,
  DeleteAccountCommandProvider,
  GenerateRefreshTokenProvider,
  LoginCommandProvider,
  LogoutCommandProvider,
  RequestResetPasswordCommandProvider,
  ResendAccountConfirmationCommandProvider,
  ValidateSecurityTokenCommandProvider,
} from '~/account/infra/ioc/providers/commands'
import { ExportUserDataQueryProvider, GetUserQueryProvider } from '~/account/infra/ioc/providers/queries'
import { AccountAuthenticatedController } from '~/account/presentation/controllers/account-authenticated.controller'
import { AccountController } from '~/account/presentation/controllers/account.controller'

@Module({
  imports: [],
  providers: [
    LoginCommandProvider.register(),
    GetUserQueryProvider.register(),
    ExportUserDataQueryProvider.register(),
    GenerateRefreshTokenProvider.register(),
    LogoutCommandProvider.register(),
    CreateAccountCommandProvider.register(),
    DeleteAccountCommandProvider.register(),
    ConfirmAccountCommandProvider.register(),
    ValidateSecurityTokenCommandProvider.register(),
    ResendAccountConfirmationCommandProvider.register(),
    RequestResetPasswordCommandProvider.register(),
    ConfirmPasswordResetCommandProvider.register(),
  ],
  exports: [],
  controllers: [AccountController, AccountAuthenticatedController],
})
export class AccountModule {}
