import { BaseException } from '~/shared/domain/exceptions/base.exception'
import { HttpStatusCodeEnum } from '~/shared/infra/constants/http-status-code.enum'

export class SlugAlreadyExistException extends BaseException {
  constructor(readonly details?: string) {
    super({
      customMessage: 'Tenant slug already exists',
      statusCode: HttpStatusCodeEnum.CONFLICT,
      statusText: 'SlugAlreadyExistException',
    })
  }
}
