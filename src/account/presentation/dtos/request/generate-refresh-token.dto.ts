import { TokenDecorator } from '~/shared/presentation/decorators'

export class GenerateRefreshTokenDto {
  @TokenDecorator()
  refreshToken: string
}
