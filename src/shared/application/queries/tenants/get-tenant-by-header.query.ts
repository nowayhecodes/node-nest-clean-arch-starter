export interface IGetTenantByHeaderQuery {
  execute(input: IGetTenantByHeaderQuery.Input): IGetTenantByHeaderQuery.Output
}

export namespace IGetTenantByHeaderQuery {
  export type Input = {
    tenantId: string | null
    origin: string | null
  }
  export type Output = Promise<Response>
  export type Response = {
    id: string
    name: string
    slug: string
    url: string
    logoUrl: string | null
    imageUploadedDate: Date | null
    designTokens: object
    databaseHost: string
    databasePort: number
    databaseUsername: string
    databasePassword: string
    databaseName: string
    databaseSchema: string
    blockedDate: Date | null
  }
}
