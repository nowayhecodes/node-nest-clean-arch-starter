import { BaseException } from '~/shared/domain/exceptions/base.exception'
import { HttpStatusCodeEnum } from '~/shared/infra/constants/http-status-code.enum'

export class ExpiredTokenException extends BaseException {
  constructor(readonly details?: string) {
    super({
      customMessage: 'Token is expired',
      statusCode: HttpStatusCodeEnum.UNAUTHORIZED,
      statusText: 'ExpiredTokenException',
    })
  }
}
