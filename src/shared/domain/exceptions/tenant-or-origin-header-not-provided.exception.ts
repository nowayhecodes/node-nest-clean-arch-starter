import { BaseException } from '~/shared/domain/exceptions/base.exception'
import { HttpStatusCodeEnum } from '~/shared/infra/constants/http-status-code.enum'

export class TenantIdOrOriginHeaderNotProvided extends BaseException {
  constructor() {
    super({
      customMessage: 'Header tenant_id or origin was not provided.',
      statusCode: HttpStatusCodeEnum.BAD_REQUEST,
      statusText: 'TenantIdOrOriginHeaderNotProvided',
    })
  }
}
