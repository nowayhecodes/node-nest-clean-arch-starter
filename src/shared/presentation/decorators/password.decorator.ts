import { applyDecorators } from '@nestjs/common'
import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString, Matches, MaxLength, MinLength } from 'class-validator'

export function PasswordDecorator() {
  return applyDecorators(
    ApiProperty({ name: 'password', example: 'Senha123' }),
    IsNotEmpty(),
    IsString(),
    MinLength(8),
    MaxLength(100),
    Matches(/^(?=.*[A-Z])(?=.*[!@#$%^&*.])(?=.*[0-9]).{8,}/, {
      message: 'password too weak',
    }),
  )
}
