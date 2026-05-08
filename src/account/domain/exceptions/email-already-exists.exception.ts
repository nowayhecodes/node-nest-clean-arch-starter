import { BaseException } from '~/shared/domain/exceptions/base.exception'
import { HttpStatusCodeEnum } from '~/shared/infra/constants/http-status-code.enum'

export class EmailAlreadyExistException extends BaseException {
  constructor(readonly details?: string) {
    super({
      customMessage: 'Email is already used by other user',
      statusCode: HttpStatusCodeEnum.CONFLICT,
      statusText: 'EmailAlreadyExistException',
    })
  }
}
