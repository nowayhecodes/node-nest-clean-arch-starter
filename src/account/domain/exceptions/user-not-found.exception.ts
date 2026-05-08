import { BaseException } from '~/shared/domain/exceptions/base.exception'
import { HttpStatusCodeEnum } from '~/shared/infra/constants/http-status-code.enum'

export class UserNotFoundException extends BaseException {
  constructor(readonly details?: string) {
    super({
      customMessage: 'User was not found',
      statusCode: HttpStatusCodeEnum.NOT_FOUND,
      statusText: 'UserNotFoundException',
    })
  }
}
