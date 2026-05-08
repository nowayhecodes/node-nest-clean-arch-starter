import { ApiProperty } from '@nestjs/swagger'
import { Expose } from 'class-transformer'
import { EmailDecorator, UuidDecorator } from '~/shared/presentation/decorators'

export class GetUserResponseDto {
  @UuidDecorator()
  id: string

  @ApiProperty({ example: 'John' })
  @Expose()
  firstName: string

  @ApiProperty({ example: 'Doe' })
  @Expose()
  lastName: string

  @EmailDecorator()
  email: string

  @ApiProperty({ example: 'en-US' })
  @Expose()
  language: string

  @ApiProperty({ example: 'UTC' })
  @Expose()
  timezone: string
}
