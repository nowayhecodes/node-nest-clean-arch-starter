import { ApiProperty } from '@nestjs/swagger'
import { Expose } from 'class-transformer'
import { Environment } from '~/shared/infra/config/environment.enum'
import { UuidDecorator } from '~/shared/presentation/decorators'

export class GetTenantByHeaderDto {
  @UuidDecorator()
  id: string

  @ApiProperty({ example: 'LocalDev' })
  @Expose()
  name: string

  @ApiProperty({ example: 'http://localhost:3000' })
  @Expose()
  url: string | null

  @ApiProperty({ example: 'http://localhost:3000/file' })
  @Expose()
  logoUrl: string | null

  @ApiProperty({ example: 'localdev' })
  @Expose()
  slug: string

  @ApiProperty({
    example: {
      shape: {
        borderRadius: 4,
        buttonRadius: 4,
        textAreaRadius: 4,
        calendarDayRadius: 4,
      },
    },
  })
  @Expose()
  designTokens: object

  @ApiProperty({ example: '1.0.0' })
  @Expose()
  appVersion: string

  @ApiProperty({ example: Environment.DEV })
  @Expose()
  environment: string
}
