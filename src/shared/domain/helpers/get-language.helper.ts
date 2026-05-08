import { LanguageIsoCodeEnum } from '~/shared/domain/constants/language.enum'

export function getLanguage(query: GetLanguageHelper.Query, language: GetLanguageHelper.Language): string {
  if (!query || typeof query !== 'object') {
    return ''
  }
  if (language === LanguageIsoCodeEnum.PT_BR && query[LanguageIsoCodeEnum.PT_BR]) {
    return query[LanguageIsoCodeEnum.PT_BR]
  }
  if (query[LanguageIsoCodeEnum.EN_US]) {
    return query[LanguageIsoCodeEnum.EN_US]
  }
  return ''
}

export namespace GetLanguageHelper {
  export type Language = LanguageIsoCodeEnum.PT_BR | LanguageIsoCodeEnum.EN_US
  export type Query =
    | {
        [key in LanguageIsoCodeEnum]: string
      }
    | null
}
