import { ConfigService } from '@nestjs/config'
import { LoginPolicyAdapter } from '~/shared/infra/config/login-policy.adapter'
import { SharedProviderEnum } from '~/shared/infra/ioc/shared-provider.enum'

export const LoginPolicyProvider = {
  provide: SharedProviderEnum.LOGIN_POLICY,
  useFactory: (configService: ConfigService) => new LoginPolicyAdapter(configService),
  inject: [ConfigService],
}
