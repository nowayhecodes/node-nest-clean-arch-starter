import { BaseQuery } from '~/shared/application/queries/base'

/**
 * GDPR Art. 20 / LGPD Art. 18 — Right to Data Portability.
 * Returns all personal data held about the authenticated user.
 */
export interface IExportUserDataQuery extends BaseQuery<IExportUserDataQuery.Input, IExportUserDataQuery.Output> {
  execute(input: IExportUserDataQuery.Input): IExportUserDataQuery.Output
}

export namespace IExportUserDataQuery {
  export type Input = { userId: string }
  export type Output = Promise<Response>
  export type Response = {
    id: string
    firstName: string
    lastName: string
    email: string
    language: string
    timezone: string
    emailConfirmedDate: Date | null
    consentDate: Date | null
    createdDate: Date
  }
}
