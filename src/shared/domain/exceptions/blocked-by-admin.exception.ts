import { BaseException } from '~/shared/domain/exceptions/base.exception'
import { HttpStatusCodeEnum } from '~/shared/infra/constants/http-status-code.enum'

export class BlockedByAdminException extends BaseException {
  constructor(readonly details?: string) {
    super({
      customMessage: 'Account is blocked by admin',
      statusCode: HttpStatusCodeEnum.UNAUTHORIZED,
      statusText: 'BlockedByAdminException',
    })
  }
}
