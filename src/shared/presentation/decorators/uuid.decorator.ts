import { applyDecorators } from '@nestjs/common'
import { ApiProperty } from '@nestjs/swagger'
import { Expose } from 'class-transformer'
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator'

export function UuidDecorator(isRequired = true) {
  return applyDecorators(
    Expose(),
    ApiProperty({
      example: '29455e54-cdf5-4720-8494-b4046806b053',
      required: isRequired,
    }),
    isRequired ? IsNotEmpty() : IsOptional(),
    IsString(),
    IsUUID(),
  )
}
