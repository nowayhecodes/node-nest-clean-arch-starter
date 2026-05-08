import { readFileSync } from 'fs'
import path from 'path'
import { Body, Controller, Get, Inject, Post, Req } from '@nestjs/common'
import { FastifyRequest } from 'fastify'
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import { TenantRegisterCommand } from '~/shared/application/commands'
import { IGetTenantByHeaderQuery } from '~/shared/application/queries/tenants'
import { Tenant } from '~/shared/domain/entities'
import { SharedProviderEnum } from '~/shared/infra/ioc/shared-provider.enum'
import { OriginHeaderDecorator, TenantHeaderDecorator } from '~/shared/presentation/decorators'
import { TenantRegisterDto } from '~/shared/presentation/dtos/request'
import { GetTenantByHeaderDto, ResponseTenantRegisterDto } from '~/shared/presentation/dtos/response'

@ApiTags('tenant')
@Controller('tenant')
export class TenantController {
  constructor(
    @Inject(SharedProviderEnum.QUERIES.GET_TENANT_BY_HEADER)
    private getTenantByHeader: IGetTenantByHeaderQuery,
    @Inject(SharedProviderEnum.COMMANDS.TENANT_REGISTER_COMMAND)
    private tenantRegisterCommand: TenantRegisterCommand.Contract,
  ) {}

  @Get()
  @OriginHeaderDecorator(false)
  @TenantHeaderDecorator(false)
  @ApiOkResponse({ type: GetTenantByHeaderDto })
  @ApiOperation({
    description: 'Get tenant information by header origin or tenant_id',
  })
  async handleGetTenantInfo(@Req() request: FastifyRequest & { currentTenant: Tenant }): Promise<GetTenantByHeaderDto> {
    const { origin, tenant_id: tenantId } = request.headers as any
    const tenant = await this.getTenantByHeader.execute({
      origin,
      tenantId,
    })
    const packageJsonPath = path.resolve(process.cwd(), 'package.json')
    const data = readFileSync(packageJsonPath, 'utf8')
    const appVersion: string = JSON.parse(data).version
    return {
      id: tenant.id,
      name: tenant.name,
      logoUrl: tenant.logoUrl,
      url: tenant.url,
      slug: tenant.slug,
      designTokens: tenant.designTokens,
      appVersion,
      environment: process.env.ENVIRONMENT!,
    }
  }

  @Post('/register')
  @ApiCreatedResponse({
    type: ResponseTenantRegisterDto,
  })
  async handleTenantRegister(@Body() dto: TenantRegisterDto): Promise<ResponseTenantRegisterDto> {
    return this.tenantRegisterCommand.execute(dto)
  }
}
