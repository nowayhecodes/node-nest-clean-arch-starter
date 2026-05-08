import { BaseException } from '~/shared/domain/exceptions/base.exception'
import { HttpStatusCodeEnum } from '~/shared/infra/constants/http-status-code.enum'

export class TenantNotFoundException extends BaseException {
  constructor(readonly details?: string) {
    super({
      customMessage: 'Tenant not found',
      statusCode: HttpStatusCodeEnum.NOT_FOUND,
      statusText: 'TenantNotFoundException',
    })
  }
}
