import { applyDecorators } from '@nestjs/common'
import { ApiHeader } from '@nestjs/swagger'
import { LanguageIsoCodeEnum } from '~/shared/domain/constants/language.enum'

export function LanguageHeaderDecorator(required = true) {
  return applyDecorators(
    ApiHeader({
      name: 'language',
      description: 'Language of the user',
      required,
      schema: {
        example: LanguageIsoCodeEnum.PT_BR,
      },
    }),
  )
}
