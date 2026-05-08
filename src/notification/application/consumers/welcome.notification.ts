import { AccountCreatedNotificationPayload } from '~/shared/domain/events/types'
import { IEmailHandler } from '~/shared/infra/contracts/email-handler'

export class WelcomeNotification implements WelcomeNotification.Contract {
  constructor(private readonly emailHandler: IEmailHandler) {}

  async execute(input: WelcomeNotification.Input): WelcomeNotification.Output {
    await this.emailHandler.send({
      subject: 'Welcome',
      templateContent: {
        linkUrl: input.url,
        userEmail: input.email,
      },
      templateName: 'welcome',
      to: [input.email],
      language: input.language,
    })
  }
}

export namespace WelcomeNotification {
  export interface Contract {
    execute(input: Input): Output
  }
  export type Input = AccountCreatedNotificationPayload
  export type Output = Promise<void>
}
