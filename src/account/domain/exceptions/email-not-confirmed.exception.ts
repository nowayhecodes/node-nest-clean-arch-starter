import { BaseException } from '~/shared/domain/exceptions/base.exception'
import { HttpStatusCodeEnum } from '~/shared/infra/constants/http-status-code.enum'

export class EmailNotConfirmedException extends BaseException {
  constructor(readonly details?: string) {
    super({
      customMessage: 'Email is not confirmed',
      statusCode: HttpStatusCodeEnum.UNAUTHORIZED,
      statusText: 'EmailNotConfirmedException',
    })
  }
}
