import { BaseException } from '~/shared/domain/exceptions/base.exception'
import { HttpStatusCodeEnum } from '~/shared/infra/constants/http-status-code.enum'

export class InvalidCredentialsException extends BaseException {
  constructor(readonly details?: string) {
    super({
      customMessage: 'Invalid credentials',
      statusCode: HttpStatusCodeEnum.UNAUTHORIZED,
      statusText: 'InvalidCredentialsException',
    })
  }
}
