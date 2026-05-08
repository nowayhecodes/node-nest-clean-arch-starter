import { BaseException } from '~/shared/domain/exceptions/base.exception'
import { HttpStatusCodeEnum } from '~/shared/infra/constants/http-status-code.enum'

export class InvalidTokenException extends BaseException {
  constructor(readonly details?: string) {
    super({
      customMessage: 'Invalid token',
      statusCode: HttpStatusCodeEnum.UNAUTHORIZED,
      statusText: 'InvalidTokenException',
    })
  }
}
