import { applyDecorators } from '@nestjs/common'
import { ApiHeader } from '@nestjs/swagger'

export function OriginHeaderDecorator(required = true) {
  return applyDecorators(
    ApiHeader({
      name: 'origin',
      description: 'Frontend origin URL',
      required,
      schema: {
        example: 'http://localhost:3000',
      },
    }),
  )
}
