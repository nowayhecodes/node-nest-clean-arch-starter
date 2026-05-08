import { BaseException } from '~/shared/domain/exceptions/base.exception'
import { HttpStatusCodeEnum } from '~/shared/infra/constants/http-status-code.enum'

export class EmailAlreadyConfirmedException extends BaseException {
  constructor(readonly details?: string) {
    super({
      customMessage: 'User email already confirmed',
      statusCode: HttpStatusCodeEnum.CONFLICT,
      statusText: 'EmailAlreadyConfirmedException',
    })
  }
}
