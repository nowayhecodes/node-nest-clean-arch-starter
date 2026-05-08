import { BaseException } from '~/shared/domain/exceptions/base.exception'
import { HttpStatusCodeEnum } from '~/shared/infra/constants/http-status-code.enum'

export class BlockedByWrongLoginTriesException extends BaseException {
  constructor(readonly details?: string) {
    super({
      customMessage: 'Account is blocked by wrong login tries',
      statusCode: HttpStatusCodeEnum.UNAUTHORIZED,
      statusText: 'BlockedByWrongLoginTriesException',
    })
  }
}
