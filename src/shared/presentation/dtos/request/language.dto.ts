import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'
import { LanguageIsoCodeEnum } from '~/shared/domain/constants/language.enum'

export class LanguageDto {
  @ApiProperty({ example: LanguageIsoCodeEnum.PT_BR })
  @IsNotEmpty()
  @IsString()
  language: LanguageIsoCodeEnum.PT_BR | LanguageIsoCodeEnum.EN_US
}
