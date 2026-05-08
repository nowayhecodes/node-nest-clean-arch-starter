import { BaseException } from '~/shared/domain/exceptions/base.exception'
import { HttpStatusCodeEnum } from '~/shared/infra/constants/http-status-code.enum'

export class TenantIdHeaderNotProvidedException extends BaseException {
  constructor(readonly details?: string) {
    super({
      customMessage: 'Header tenant_id was not provided.',
      statusCode: HttpStatusCodeEnum.BAD_REQUEST,
      statusText: 'TenantIdHeaderNotProvidedException',
    })
  }
}
