import { EmailDecorator } from '~/shared/presentation/decorators/email.decorator'

export class RequestResetPasswordDto {
  @EmailDecorator()
  email: string
}
