import { EmailDecorator } from '~/shared/presentation/decorators'

export class ResendAccountConfirmationDto {
  @EmailDecorator()
  email: string
}
