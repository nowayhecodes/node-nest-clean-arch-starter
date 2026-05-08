import { PasswordDecorator } from '~/shared/presentation/decorators'
import { EmailDecorator } from '~/shared/presentation/decorators/email.decorator'

export class LoginDto {
  @EmailDecorator()
  email: string

  @PasswordDecorator()
  password: string
}
