import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsInt, IsOptional, Min } from 'class-validator'

export class QueryPaginatedDto {
  @ApiProperty({ example: 1, required: false })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  page: number = 1

  @ApiProperty({ example: 10, required: false })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  pageSize: number = 10
}
