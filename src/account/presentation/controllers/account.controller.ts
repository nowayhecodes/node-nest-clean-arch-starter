import { Body, Controller, HttpCode, HttpStatus, Inject, Post, Req, Res } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { FastifyReply, FastifyRequest } from 'fastify'
import {
  ConfirmAccountCommand,
  ConfirmPasswordResetCommand,
  CreateAccountCommand,
  GenerateRefreshTokenCommand,
  LoginCommand,
  RequestResetPasswordCommand,
  ResendAccountConfirmationCommand,
  ValidateSecurityTokenCommand,
} from '~/account/application/commands'
import { UserNotFoundException } from '~/account/domain/exceptions'
import { AccountProviderEnum } from '~/account/infra/ioc/account.provider.enum'
import {
  ConfirmAccountDto,
  ConfirmPasswordResetDto,
  CreateAccountDto,
  GenerateRefreshTokenDto,
  LoginDto,
  RequestResetPasswordDto,
  ResendAccountConfirmationDto,
  ValidateSecurityTokenDto,
} from '~/account/presentation/dtos/request'
import {
  CreateAccountResponseDto,
  GenerateRefreshTokenResponseDto,
  LoginResponseDto,
  ValidateSecurityTokenResponseDto,
} from '~/account/presentation/dtos/response'
import { Tenant } from '~/shared/domain/entities'
import { EmailAlreadyConfirmedException } from '~/shared/domain/exceptions'
import { TenantHeaderDecorator } from '~/shared/presentation/decorators'

@ApiTags('account')
@Controller('account')
export class AccountController {
  constructor(
    @Inject(AccountProviderEnum.COMMANDS.LOGIN)
    private loginCommand: LoginCommand.Contract,
    @Inject(AccountProviderEnum.COMMANDS.GENERATE_REFRESH_TOKEN)
    private generateRefreshTokenCommand: GenerateRefreshTokenCommand.Contract,
    @Inject(AccountProviderEnum.COMMANDS.CREATE_ACCOUNT)
    private createAccountCommand: CreateAccountCommand.Contract,
    @Inject(AccountProviderEnum.COMMANDS.CONFIRM_ACCOUNT)
    private confirmAccount: ConfirmAccountCommand.Contract,
    @Inject(AccountProviderEnum.COMMANDS.VALIDATE_SECURITY_TOKEN)
    private validateSecurityToken: ValidateSecurityTokenCommand.Contract,
    @Inject(AccountProviderEnum.COMMANDS.RESEND_ACCOUNT_CONFIRMATION)
    private resendAccountConfirmation: ResendAccountConfirmationCommand.Contract,
    @Inject(AccountProviderEnum.COMMANDS.REQUEST_RESET_PASSWORD)
    private requestResetPasswordCommand: RequestResetPasswordCommand.Contract,
    @Inject(AccountProviderEnum.COMMANDS.CONFIRM_PASSWORD_RESET)
    private confirmPasswordReset: ConfirmPasswordResetCommand.Contract,
  ) {}

  @Post('/login')
  @TenantHeaderDecorator(true)
  @ApiOperation({
    description: 'Generate access credentials by email and password',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: LoginResponseDto,
  })
  async handleLogin(@Body() dto: LoginDto, @Res({ passthrough: true }) reply: FastifyReply): Promise<LoginResponseDto> {
    const { accessToken, refreshToken, email, id } = await this.loginCommand.execute({
      email: dto.email,
      password: dto.password,
    })
    const payload = { id, email, accessToken, refreshToken }
    reply.setCookie('accessToken', accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      path: '/',
    })
    reply.setCookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      path: '/',
    })
    return payload
  }

  @Post('/refresh-token')
  @TenantHeaderDecorator(true)
  @ApiOperation({
    description: 'Generate a new access token from a valid refresh token',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: GenerateRefreshTokenResponseDto,
  })
  async handleRefreshToken(@Body() dto: GenerateRefreshTokenDto): Promise<GenerateRefreshTokenResponseDto> {
    return this.generateRefreshTokenCommand.execute({
      refreshToken: dto.refreshToken,
    })
  }

  @Post('/sign-up')
  @TenantHeaderDecorator(true)
  @ApiOperation({
    description: 'Create a new user on system',
  })
  @ApiResponse({ status: HttpStatus.CREATED, type: CreateAccountResponseDto })
  async handleCreateUser(
    @Body() dto: CreateAccountDto,
    @Req() request: FastifyRequest & { currentTenant: Tenant },
  ): Promise<CreateAccountResponseDto> {
    return this.createAccountCommand.execute({
      email: dto.email,
      password: dto.password,
      firstName: dto.firstName,
      lastName: dto.lastName,
      language: dto.language,
      timezone: dto.timezone,
      tenantUrl: request.currentTenant.url,
      consentAccepted: dto.consentAccepted,
    })
  }

  @Post('/confirm-account')
  @HttpCode(HttpStatus.NO_CONTENT)
  @TenantHeaderDecorator(true)
  @ApiOperation({
    description: 'Confirm user account email',
  })
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  async handleConfirmAccount(
    @Body() dto: ConfirmAccountDto,
    @Req() request: FastifyRequest & { currentTenant: Tenant },
  ): Promise<void> {
    await this.confirmAccount.execute({
      securityToken: dto.securityToken,
      tenantUrl: request.currentTenant.url,
    })
  }

  @Post('/validate-security-token')
  @TenantHeaderDecorator(true)
  @ApiOperation({
    description: 'Return if the provided security token is valid or not',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: ValidateSecurityTokenResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    example: new UserNotFoundException(),
  })
  async handleValidateSecurityToken(@Body() dto: ValidateSecurityTokenDto): Promise<{ isValid: boolean }> {
    return this.validateSecurityToken.execute({
      securityToken: dto.securityToken,
    })
  }

  @Post('/resend-account-confirmation')
  @HttpCode(HttpStatus.NO_CONTENT)
  @TenantHeaderDecorator(true)
  @ApiOperation({
    description: 'Request another email with the security token to confirm account',
  })
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    example: new UserNotFoundException(),
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    example: new EmailAlreadyConfirmedException(),
  })
  async handleResendAccountConfirmation(
    @Body() dto: ResendAccountConfirmationDto,
    @Req() request: FastifyRequest & { currentTenant: Tenant },
  ): Promise<void> {
    await this.resendAccountConfirmation.execute({
      email: dto.email,
      tenantUrl: request.currentTenant.url,
    })
  }

  @Post('/forgot-password')
  @TenantHeaderDecorator(true)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    description: 'Request a reset password email with a security token',
  })
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  async handleRequestResetPassword(
    @Body() dto: RequestResetPasswordDto,
    @Req() request: FastifyRequest & { currentTenant: Tenant },
  ): Promise<void> {
    const { tenant_id: tenantId } = request.headers as any
    await this.requestResetPasswordCommand.execute({
      email: dto.email,
      tenantId,
      tenantUrl: request.currentTenant.url,
    })
  }

  @Post('/reset-password')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    description: 'Confirm user password update',
  })
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  async handleConfirmPasswordReset(@Body() dto: ConfirmPasswordResetDto): Promise<void> {
    await this.confirmPasswordReset.execute({
      password: dto.password,
      securityToken: dto.securityToken,
    })
  }
}
