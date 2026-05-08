export interface IEmailHandler {
  send(params: IEmailHandler.Input): Promise<void>
}

export namespace IEmailHandler {
  export type EmailAttachment = {
    fileName: string
    fileBuffer: Buffer
  }
  export type Input = {
    to: Array<string>
    cc?: string[]
    bcc?: string[]
    subject: string
    templateName: string
    templateContent: any
    attachments?: EmailAttachment[]
    language: string
  }
}
