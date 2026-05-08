import { UserNotFoundException } from '~/account/domain/exceptions'
import { BaseCommand } from '~/shared/application/commands/base'
import { IUserRepository } from '~/shared/domain/repositories/tenant/user.repository'

export class LogoutCommand implements LogoutCommand.Contract {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(input: LogoutCommand.Input): LogoutCommand.Output {
    const user = await this.userRepository.findById(input.userId)
    if (!user) throw new UserNotFoundException()
    user.logout()
    await this.userRepository.save(user)
  }
}

export namespace LogoutCommand {
  export interface Contract extends BaseCommand<Input, Output> {}
  export type Input = { userId: string }
  export type Output = Promise<void>
}
