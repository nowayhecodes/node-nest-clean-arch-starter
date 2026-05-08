import { ApiProperty } from '@nestjs/swagger'
import { Expose } from 'class-transformer'
import { EmailDecorator, UuidDecorator } from '~/shared/presentation/decorators'

export class CreateAccountResponseDto {
  @UuidDecorator()
  id: string

  @EmailDecorator()
  email: string

  @ApiProperty({ example: 'John' })
  @Expose()
  firstName: string

  @ApiProperty({ example: 'Doe' })
  @Expose()
  lastName: string
}
