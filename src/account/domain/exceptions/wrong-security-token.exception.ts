import { BaseException } from '~/shared/domain/exceptions/base.exception'
import { HttpStatusCodeEnum } from '~/shared/infra/constants/http-status-code.enum'

export class WrongSecurityTokenException extends BaseException {
  constructor(readonly details?: string) {
    super({
      customMessage: 'Wrong security token',
      statusCode: HttpStatusCodeEnum.BAD_REQUEST,
      statusText: 'WrongSecurityTokenException',
    })
  }
}
