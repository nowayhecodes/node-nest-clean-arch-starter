import { BaseException } from '~/shared/domain/exceptions/base.exception'
import { HttpStatusCodeEnum } from '~/shared/infra/constants/http-status-code.enum'

export class DomainValidationException extends BaseException {
  constructor(readonly message: string) {
    super({
      customMessage: message,
      statusCode: HttpStatusCodeEnum.UNPROCESSABLE_ENTITY,
      statusText: 'DomainValidationException',
    })
  }
}
