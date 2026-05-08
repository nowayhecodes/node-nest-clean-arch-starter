import { EmailDecorator, TokenDecorator, UuidDecorator } from '~/shared/presentation/decorators'

export class LoginResponseDto {
  @UuidDecorator()
  id: string

  @EmailDecorator()
  email: string

  @TokenDecorator()
  accessToken: string

  @TokenDecorator()
  refreshToken: string
}
