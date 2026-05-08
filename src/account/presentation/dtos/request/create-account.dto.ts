import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsEnum, IsNotEmpty, IsOptional, IsString, MaxLength, ValidateIf } from 'class-validator'
import { LanguageIsoCodeEnum } from '~/shared/domain/constants/language.enum'
import { TimezoneEnum } from '~/shared/domain/constants/timezone.enum'
import { EmailDecorator, PasswordDecorator } from '~/shared/presentation/decorators'

export class CreateAccountDto {
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

  /** GDPR / LGPD — user must explicitly accept the privacy policy to register */
  @ApiProperty({
    example: true,
    description: 'User must accept the privacy policy (GDPR / LGPD)',
  })
  @IsBoolean()
  consentAccepted: boolean
}
