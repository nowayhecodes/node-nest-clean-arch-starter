import { BaseException } from '~/shared/domain/exceptions/base.exception'
import { HttpStatusCodeEnum } from '~/shared/infra/constants/http-status-code.enum'

export class UnauthorizedException extends BaseException {
  constructor(readonly details?: string) {
    super({
      customMessage: 'Unauthorized',
      statusCode: HttpStatusCodeEnum.UNAUTHORIZED,
      statusText: 'UnauthorizedException',
    })
  }
}
