import { applyDecorators } from '@nestjs/common'
import { ApiHeader } from '@nestjs/swagger'

export function TenantHeaderDecorator(required = true) {
  return applyDecorators(
    ApiHeader({
      name: 'tenant_id',
      description: 'Tenant ID',
      required,
      schema: {
        example: '7bb440f0-0f3a-46e3-8d1a-2b83ff64d65d',
      },
    }),
  )
}
