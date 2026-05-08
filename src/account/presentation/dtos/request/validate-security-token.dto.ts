import { TokenDecorator } from '~/shared/presentation/decorators'

export class ValidateSecurityTokenDto {
  @TokenDecorator()
  securityToken: string
}
