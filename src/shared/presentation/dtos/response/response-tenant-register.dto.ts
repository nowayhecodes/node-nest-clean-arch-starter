import { ApiProperty } from '@nestjs/swagger'
import { Expose } from 'class-transformer'

export class ResponseTenantRegisterDto {
  @Expose()
  @ApiProperty({
    example: {
      id: '1532f725-e265-4338-b3ca-f181f41bda96',
      name: 'Sof.to',
      slug: 'softo',
      url: 'https://boiler.sof.to',
    },
  })
  admin: object

  @Expose()
  @ApiProperty({
    example: {
      id: 'a88326ed-e7a5-40c7-8aec-715f063ee4cb',
      email: 'user@sof.to',
      firstName: 'John',
      lastName: 'Doe',
    },
  })
  tenant: object
}
