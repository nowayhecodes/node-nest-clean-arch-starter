import { AccountCreatedNotificationPayload } from '~/shared/domain/events/types'
import { IEmailHandler } from '~/shared/infra/contracts/email-handler'

export class ResetPasswordNotification implements ResetPasswordNotification.Contract {
  constructor(private readonly emailHandler: IEmailHandler) {}

  async execute(input: ResetPasswordNotification.Input): ResetPasswordNotification.Output {
    await this.emailHandler.send({
      subject: 'Password reset',
      templateContent: {
        userName: input.firstName,
        linkUrl: input.url,
        userEmail: input.email,
      },
      templateName: 'reset-password',
      to: [input.email],
      language: input.language,
    })
  }
}

export namespace ResetPasswordNotification {
  export interface Contract {
    execute(input: Input): Output
  }
  export type Input = AccountCreatedNotificationPayload
  export type Output = Promise<void>
}
