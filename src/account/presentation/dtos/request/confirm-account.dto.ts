import { TokenDecorator } from '~/shared/presentation/decorators'

export class ConfirmAccountDto {
  @TokenDecorator()
  securityToken: string
}
