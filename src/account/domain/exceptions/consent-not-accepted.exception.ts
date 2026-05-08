import { HttpStatusCodeEnum } from '~/shared/infra/constants/http-status-code.enum'
import { BaseException } from '~/shared/domain/exceptions/base.exception'

export class ConsentNotAcceptedException extends BaseException {
  constructor() {
    super({
      customMessage: 'User must accept the privacy policy before registering',
      statusCode: HttpStatusCodeEnum.UNPROCESSABLE_ENTITY,
      statusText: 'ConsentNotAcceptedException',
    })
  }
}
