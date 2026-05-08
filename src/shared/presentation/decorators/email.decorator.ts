import { applyDecorators } from '@nestjs/common'
import { ApiProperty } from '@nestjs/swagger'
import { Expose, Transform } from 'class-transformer'
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  Validate,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator'

@ValidatorConstraint({ name: 'customEmail', async: false })
class CustomEmailValidator implements ValidatorConstraintInterface {
  validate(email: string) {
    const emailRegex =
      /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
    return emailRegex.test(email)
  }

  defaultMessage() {
    return 'email is not valid'
  }
}

export function EmailDecorator(isRequired = true) {
  return applyDecorators(
    Expose(),
    ApiProperty({
      name: 'email',
      example: 'user@sof.to',
      required: isRequired,
    }),
    isRequired ? IsNotEmpty() : IsOptional(),
    IsString(),
    MaxLength(100),
    Validate(CustomEmailValidator),
    Transform(({ value }: { value: string }) => {
      return typeof value === 'string' ? value.toLowerCase() : value
    }),
  )
}
