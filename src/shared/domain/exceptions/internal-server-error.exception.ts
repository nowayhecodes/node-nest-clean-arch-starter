import { BaseException } from '~/shared/domain/exceptions/base.exception'
import { HttpStatusCodeEnum } from '~/shared/infra/constants/http-status-code.enum'

export class InternalServerErrorException extends BaseException {
  constructor(readonly details?: string) {
    super({
      customMessage: 'Internal server error',
      statusCode: HttpStatusCodeEnum.INTERNAL_SERVER_ERROR,
      statusText: 'InternalServerErrorException',
    })
  }
}
