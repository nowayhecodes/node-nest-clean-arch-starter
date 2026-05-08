import { BaseException } from '~/shared/domain/exceptions/base.exception'
import { HttpStatusCodeEnum } from '~/shared/infra/constants/http-status-code.enum'

export class RevokedTokenException extends BaseException {
  constructor(readonly details?: string) {
    super({
      customMessage: 'Token is revoked',
      statusCode: HttpStatusCodeEnum.UNAUTHORIZED,
      statusText: 'RevokedTokenException',
    })
  }
}
