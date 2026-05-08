import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { ILoginPolicy } from '~/shared/infra/contracts/login-policy'

@Injectable()
export class LoginPolicyAdapter implements ILoginPolicy {
  constructor(private readonly configService: ConfigService) {}

  get maxAttempts(): number {
    return this.configService.get<number>('LOGIN_MAX_ATTEMPTS') ?? 5
  }

  get lockoutMinutes(): number {
    return this.configService.get<number>('LOGIN_LOCKOUT_MINUTES') ?? 15
  }

  get requireEmailConfirmation(): boolean {
    return this.configService.get<string>('REQUIRE_EMAIL_CONFIRMATION') === 'true'
  }
}
