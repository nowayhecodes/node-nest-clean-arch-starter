import { applyDecorators } from '@nestjs/common'
import { ApiProperty } from '@nestjs/swagger'
import { Expose } from 'class-transformer'
import { IsNotEmpty, IsString } from 'class-validator'

export function TokenDecorator() {
  return applyDecorators(
    Expose(),
    ApiProperty({
      example:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmNGEyMGE2LWJjODYtNDk2NS05OWFhLWQwNThlNjczMjVmZCIsImVtYWlsIjoiYnJ1bm8uZGFtYXNjZW5vQHNvZi50byIsImlhdCI6MTcxMzE4MjAyNCwiZXhwIjoxNzEzMTg1NjI0fQ.XsuK3z3Y1P7NgC9b_0BX8tncrFlckVzoOVkxJa9ScFo',
    }),
    IsNotEmpty(),
    IsString(),
  )
}
