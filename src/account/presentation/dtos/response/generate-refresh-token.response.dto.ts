import { TokenDecorator } from '~/shared/presentation/decorators'

export class GenerateRefreshTokenResponseDto {
  @TokenDecorator()
  accessToken: string

  @TokenDecorator()
  refreshToken: string
}
