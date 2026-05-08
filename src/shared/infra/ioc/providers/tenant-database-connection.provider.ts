import { Provider, Scope } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { REQUEST } from '@nestjs/core'
import { isUUID } from 'class-validator'
import { FastifyRequest } from 'fastify'
import { DataSource } from 'typeorm'
import { IGetTenantByIdQuery } from '~/shared/application/queries/tenants/get-tenant-by-id.query'
import { Tenant } from '~/shared/domain/entities'
import { TenantIdHeaderInvalidException, TenantIdHeaderNotProvidedException } from '~/shared/domain/exceptions'
import { ICryptography } from '~/shared/infra/contracts/cryptography'
import { IDatabase } from '~/shared/infra/contracts/database'
import { ConnectionManager } from '~/shared/infra/database/typeorm/manager/connection.manager'
import { SharedProviderEnum } from '~/shared/infra/ioc/shared-provider.enum'

export class TenantDatabaseConnectionProvider {
  static register(): Provider {
    return {
      provide: SharedProviderEnum.APPLICATION_DATABASE_CONNECTION,
      useFactory: async (
        request: FastifyRequest & {
          currentTenant?: IGetTenantByIdQuery.TenantDto
          tenantDatabaseConnection: DataSource
        },
        getTenantByIdCommand: IGetTenantByIdQuery,
        cryptoGraphy: ICryptography,
        configService: ConfigService,
        connectionManager: ConnectionManager,
      ): Promise<IDatabase> => {
        const isMultiSchema = configService.getOrThrow('MULTI_SCHEMA') === 'true'
        if (isMultiSchema) {
          const tenantId = request?.headers['tenant_id']
          if (!tenantId) throw new TenantIdHeaderNotProvidedException()
          if (!isUUID(tenantId)) throw new TenantIdHeaderInvalidException()
          const tenant = await getTenantByIdCommand.execute({
            tenantId,
          })
          request.currentTenant = tenant
          const database = await connectionManager.getConnection({
            ...tenant,
            databaseUsername: tenant.databaseUsername,
            databasePassword: cryptoGraphy.decrypt(tenant.databasePassword),
          })
          return database
        }
        const tenant = new Tenant({
          id: configService.getOrThrow('TENANT_ID'),
          name: configService.getOrThrow('TENANT_NAME'),
          slug: configService.getOrThrow('TENANT_SLUG'),
          url: configService.getOrThrow('TENANT_URL'),
          databaseHost: configService.getOrThrow('TENANT_DB_HOST'),
          databasePort: configService.getOrThrow('TENANT_DB_PORT'),
          databaseUsername: configService.getOrThrow('TENANT_DB_USER'),
          databasePassword: configService.getOrThrow('TENANT_DB_PASS'),
          databaseName: configService.getOrThrow('TENANT_DB_NAME'),
          databaseSchema: configService.getOrThrow('TENANT_DB_SCHEMA'),
        })
        const database = await connectionManager.getConnection(tenant)
        await database.connect()
        request.currentTenant = tenant
        return database
      },
      inject: [
        REQUEST,
        SharedProviderEnum.QUERIES.GET_TENANT_BY_ID,
        SharedProviderEnum.CRYPTOGRAPHY,
        ConfigService,
        SharedProviderEnum.CONNECTION_MANAGER,
      ],
      scope: Scope.REQUEST,
    }
  }
}
