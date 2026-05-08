import { PasswordDecorator, TokenDecorator } from '~/shared/presentation/decorators'

export class ConfirmPasswordResetDto {
  @TokenDecorator()
  securityToken: string

  @PasswordDecorator()
  password: string
}
