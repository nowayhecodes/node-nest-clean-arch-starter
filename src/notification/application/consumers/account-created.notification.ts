import { AccountCreatedNotificationPayload } from '~/shared/domain/events/types'
import { IEmailHandler } from '~/shared/infra/contracts/email-handler'

export class AccountCreatedNotification implements AccountCreatedNotification.Contract {
  constructor(private readonly emailHandler: IEmailHandler) {}

  async execute(input: AccountCreatedNotification.Input): AccountCreatedNotification.Output {
    await this.emailHandler.send({
      subject: 'Account created',
      templateContent: {
        userName: input.firstName,
        linkUrl: input.url,
        userEmail: input.email,
      },
      templateName: 'account-confirmation',
      to: [input.email],
      language: input.language,
    })
  }
}

export namespace AccountCreatedNotification {
  export interface Contract {
    execute(input: Input): Output
  }
  export type Input = AccountCreatedNotificationPayload
  export type Output = Promise<void>
}
