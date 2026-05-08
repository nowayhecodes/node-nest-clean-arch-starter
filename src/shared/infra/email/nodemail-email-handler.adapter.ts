import { readFileSync } from 'fs'
import { compile } from 'handlebars'
import mjml2html from 'mjml'
import { Transporter, createTransport } from 'nodemailer'
import { IEmailHandler } from '~/shared/infra/contracts/email-handler'

export class NodeMailerEmailHandlerAdapter implements IEmailHandler {
  private client: Transporter
  private mailTo?: string
  private environment?: string
  private mailFrom: string

  constructor(params: {
    host: string
    port: number
    user: string
    password: string
    mailTo?: string
    environment?: string
    mailFrom: string
  }) {
    this.client = createTransport({
      host: params.host,
      port: params.port,
      auth: {
        user: params.user,
        pass: params.password,
      },
    })
    this.mailTo = params.mailTo
    this.environment = params.environment
    this.mailFrom = params.mailFrom
  }

  async send(input: IEmailHandler.Input): Promise<void> {
    const templateContent = readFileSync(`${__dirname}/templates/${input.language}/${input.templateName}.mjml`, 'utf8')
    const template = compile(templateContent)
    const mjml = template(input.templateContent)
    const { html } = mjml2html(mjml)
    const to = this.checkOverrideEmail() || input.to
    const subjectTag = this.getEnvironmentTag()
    await this.client.sendMail({
      to,
      from: this.mailFrom,
      cc: input?.cc,
      bcc: input?.bcc,
      html,
      subject: `${subjectTag}${input.subject}`,
      attachments: input.attachments?.map((item) => ({
        filename: item.fileName,
        content: item.fileBuffer,
      })),
    })
  }

  private checkOverrideEmail() {
    if (this.mailTo && this.mailTo !== '') {
      const emailList = this.mailTo.split(',')
      return emailList
    }
  }

  private getEnvironmentTag() {
    if (this.environment !== 'production') {
      return `[${this.environment}] `
    }
    return ''
  }
}
