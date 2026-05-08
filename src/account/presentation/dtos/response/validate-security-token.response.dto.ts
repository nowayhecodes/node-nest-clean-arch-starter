import { ApiProperty } from '@nestjs/swagger'
import { Expose } from 'class-transformer'

export class ValidateSecurityTokenResponseDto {
  @ApiProperty({ example: true })
  @Expose()
  isValid: boolean
}
