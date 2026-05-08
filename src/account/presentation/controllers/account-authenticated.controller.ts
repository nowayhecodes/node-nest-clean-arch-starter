import { Controller, Delete, Get, HttpCode, HttpStatus, Inject, Post, Res, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { FastifyReply } from 'fastify'
import { DeleteAccountCommand, LogoutCommand } from '~/account/application/commands'
import { IExportUserDataQuery, IGetUserQuery } from '~/account/application/queries'
import { AccountProviderEnum } from '~/account/infra/ioc/account.provider.enum'
import { GetUserResponseDto } from '~/account/presentation/dtos/response'
import { JwtAuthGuard } from '~/shared/infra/guards/jwt-auth.guard'
import { TenantHeaderDecorator } from '~/shared/presentation/decorators'
import { CurrentUser } from '~/shared/presentation/decorators/current-user.decorator'

@ApiBearerAuth()
@ApiTags('account')
@Controller('account')
@UseGuards(JwtAuthGuard)
export class AccountAuthenticatedController {
  constructor(
    @Inject(AccountProviderEnum.QUERIES.GET_USER)
    private readonly getUserQuery: IGetUserQuery,
    @Inject(AccountProviderEnum.QUERIES.EXPORT_USER_DATA)
    private readonly exportUserDataQuery: IExportUserDataQuery,
    @Inject(AccountProviderEnum.COMMANDS.LOGOUT)
    private readonly logoutCommand: LogoutCommand.Contract,
    @Inject(AccountProviderEnum.COMMANDS.DELETE_ACCOUNT)
    private readonly deleteAccountCommand: DeleteAccountCommand.Contract,
  ) {}

  @Get('me')
  @TenantHeaderDecorator(true)
  @ApiOperation({
    description: 'Get current authenticated user information',
  })
  @ApiResponse({ status: HttpStatus.OK, type: GetUserResponseDto })
  async handleGetUser(@CurrentUser() user: { id: string }): Promise<GetUserResponseDto> {
    return this.getUserQuery.execute({ userId: user.id })
  }

  @Post('logout')
  @TenantHeaderDecorator(true)
  @ApiOperation({
    description: 'Logout user removing token and setting the date of logout',
  })
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  async handleLogout(
    @CurrentUser() user: { id: string },
    @Res({ passthrough: true }) reply: FastifyReply,
  ): LogoutCommand.Output {
    await this.logoutCommand.execute({ userId: user.id })
    reply.clearCookie('accessToken')
    reply.clearCookie('refreshToken')
  }

  /**
   * GDPR Art. 20 / LGPD Art. 18 — Right to Data Portability.
   * Returns all personal data held about the authenticated user.
   */
  @Get('me/data')
  @TenantHeaderDecorator(true)
  @ApiOperation({ description: 'Export all personal data for the current user (GDPR / LGPD)' })
  @ApiResponse({ status: HttpStatus.OK })
  async handleExportUserData(@CurrentUser() user: { id: string }): IExportUserDataQuery.Output {
    return this.exportUserDataQuery.execute({ userId: user.id })
  }

  /**
   * GDPR Art. 17 / LGPD Art. 18 — Right to Erasure ("Right to be forgotten").
   * Anonymizes all PII and soft-deletes the account.
   */
  @Delete('me')
  @TenantHeaderDecorator(true)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ description: 'Permanently delete and anonymize account data (GDPR / LGPD)' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  async handleDeleteAccount(
    @CurrentUser() user: { id: string },
    @Res({ passthrough: true }) reply: FastifyReply,
  ): DeleteAccountCommand.Output {
    await this.deleteAccountCommand.execute({ userId: user.id })
    reply.clearCookie('accessToken')
    reply.clearCookie('refreshToken')
  }
}
