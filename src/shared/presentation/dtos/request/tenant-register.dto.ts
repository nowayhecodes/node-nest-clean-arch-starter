import { ApiProperty } from '@nestjs/swagger'
import { Expose, Type } from 'class-transformer'
import { IsEnum, IsNotEmpty, IsOptional, IsString, MaxLength, ValidateIf, ValidateNested } from 'class-validator'
import { LanguageIsoCodeEnum } from '~/shared/domain/constants/language.enum'
import { TimezoneEnum } from '~/shared/domain/constants/timezone.enum'
import { EmailDecorator, PasswordDecorator } from '~/shared/presentation/decorators'

class TenantDto {
  @ApiProperty({ example: 'softo' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(58)
  slug: string

  @ApiProperty({ example: 'Sof.to' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  name: string
}

class AdminDto {
  @EmailDecorator()
  email: string

  @PasswordDecorator()
  password: string

  @ApiProperty({ example: 'John' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(200)
  firstName: string

  @ApiProperty({ example: 'Doe' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(200)
  lastName: string

  @ApiProperty({
    example: LanguageIsoCodeEnum.PT_BR,
    enum: LanguageIsoCodeEnum,
    nullable: true,
  })
  @IsOptional()
  @ValidateIf((o) => o.language !== null && o.language !== undefined)
  @IsEnum(LanguageIsoCodeEnum)
  language?: LanguageIsoCodeEnum

  @ApiProperty({
    example: TimezoneEnum['America/Sao_Paulo'],
    enum: TimezoneEnum,
    nullable: true,
  })
  @IsOptional()
  timezone?: string
}

export class TenantRegisterDto {
  @Expose()
  @ApiProperty({
    example: {
      email: 'user@sof.to',
      firstName: 'John',
      lastName: 'Doe',
      password: '@Senha123',
      language: LanguageIsoCodeEnum.EN_US,
      timezone: 'America/Sao_Paulo',
    },
  })
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => AdminDto)
  admin: AdminDto

  @Expose()
  @ApiProperty({
    example: {
      name: 'Sof.to',
      slug: 'softo',
    },
  })
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => TenantDto)
  tenant: TenantDto
}
