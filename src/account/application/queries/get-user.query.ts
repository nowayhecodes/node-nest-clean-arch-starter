import { BaseQuery } from '~/shared/application/queries/base'

export interface IGetUserQuery extends BaseQuery<IGetUserQuery.Input, IGetUserQuery.Output> {
  execute(input: IGetUserQuery.Input): IGetUserQuery.Output
}

export namespace IGetUserQuery {
  export type Input = {
    userId: string
  }
  export type Output = Promise<Response>
  export type Response = {
    id: string
    firstName: string
    lastName: string
    email: string
    language: string
    timezone: string
  }
}
