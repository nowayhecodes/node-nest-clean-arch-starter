export abstract class BaseException extends Error {
  customMessage: string | string[]
  statusCode: number = 500
  statusText: string = 'InternalServerErrorException'
  details?: string | string[]

  constructor(props: {
    customMessage?: string | string[]
    statusCode?: number
    statusText?: string
    details?: string | string[]
  }) {
    super()
    this.customMessage = props.customMessage || ''
    this.statusCode = props.statusCode || 500
    this.statusText = props.statusText || 'InternalServerErrorException'
    this.details = props.details
  }
}

export namespace BaseException {
  export type Input = {
    statusCode?: number
    statusText?: string
    customMessage?: string
  }
}
