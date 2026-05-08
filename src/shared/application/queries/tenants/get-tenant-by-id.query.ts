export interface IGetTenantByIdQuery {
  execute(input: IGetTenantByIdQuery.Input): IGetTenantByIdQuery.Output
}
export namespace IGetTenantByIdQuery {
  export type Input = {
    tenantId: string
  }
  export type Output = Promise<TenantDto>
  export type TenantDto = {
    id: string
    name: string
    slug: string
    url: string
    imageUploadedDate: Date | null
    databaseHost: string
    databasePort: number
    databaseUsername: string
    databasePassword: string
    databaseName: string
    databaseSchema: string
    blockedDate: Date | null
  }
}
