import { plainToInstance, Transform } from 'class-transformer'
import { IsBoolean, IsEnum, IsNumber, IsOptional, IsString, IsUUID, validateSync } from 'class-validator'
import { Environment } from '~/shared/infra/config/environment.enum'

class EnvironmentVariables {
  @IsEnum(Environment)
  NODE_ENV: Environment

  @IsNumber()
  PORT: number

  @IsString()
  FRONTEND_URL: string

  @IsString()
  ALLOWED_ORIGINS: string

  @IsString()
  JWT_TOKEN_SECRET: string

  @IsString()
  ACCESS_TOKEN_EXPIRATION: string

  @IsString()
  REFRESH_TOKEN_EXPIRATION: string

  @IsString()
  SECURITY_TOKEN_EXPIRATION: string

  // ── Tenant Manager Database ──────────────────────────────────────────────

  @IsString()
  DB_HOST: string

  @IsString()
  DB_USER: string

  @IsString()
  DB_PASS: string

  @IsString()
  DB_NAME: string

  @IsNumber()
  DB_PORT: number

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true' || value === true)
  DB_LOGGING?: boolean

  // ── Multi-tenancy ────────────────────────────────────────────────────────

  @IsBoolean()
  @Transform(({ value }) => value === 'true' || value === true)
  MULTI_SCHEMA: boolean

  @IsOptional()
  @IsUUID()
  TENANT_ID?: string

  @IsOptional()
  @IsString()
  TENANT_NAME?: string

  @IsOptional()
  @IsString()
  TENANT_SLUG?: string

  @IsOptional()
  @IsString()
  TENANT_URL?: string

  // ── Application (Tenant) Database ────────────────────────────────────────

  @IsString()
  TENANT_DB_HOST: string

  @IsString()
  TENANT_DB_USER: string

  @IsString()
  TENANT_DB_PASS: string

  @IsString()
  TENANT_DB_NAME: string

  @IsNumber()
  TENANT_DB_PORT: number

  @IsString()
  TENANT_DB_SCHEMA: string

  // ── Rate Limiting ─────────────────────────────────────────────────────────

  @IsNumber()
  THROTTLER_TTL: number

  @IsNumber()
  THROTTLER_LIMIT: number

  // ── Mail ─────────────────────────────────────────────────────────────────

  @IsString()
  MAIL_FROM: string

  @IsString()
  MAIL_HOST: string

  @IsNumber()
  MAIL_PORT: number

  @IsString()
  MAIL_USER: string

  @IsString()
  MAIL_PASS: string

  @IsOptional()
  @IsString()
  MAIL_TO?: string

  // ── Login Security ────────────────────────────────────────────────────────

  @IsOptional()
  @IsNumber()
  LOGIN_MAX_ATTEMPTS?: number

  @IsOptional()
  @IsNumber()
  LOGIN_LOCKOUT_MINUTES?: number

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true' || value === true)
  REQUIRE_EMAIL_CONFIRMATION?: boolean

  // ── Redis ─────────────────────────────────────────────────────────────────

  @IsOptional()
  @IsString()
  REDIS_HOST?: string

  @IsOptional()
  @IsNumber()
  REDIS_PORT?: number

  @IsOptional()
  @IsString()
  REDIS_PASS?: string

  // ── OpenTelemetry ─────────────────────────────────────────────────────────

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true' || value === true)
  OTEL_ENABLED?: boolean

  @IsOptional()
  @IsString()
  OTEL_SERVICE_NAME?: string

  @IsOptional()
  @IsString()
  OTEL_EXPORTER_OTLP_ENDPOINT?: string

  @IsOptional()
  @IsString()
  OTEL_EXPORTER_OTLP_HEADERS?: string

  @IsOptional()
  @IsNumber()
  OTEL_METRIC_EXPORT_INTERVAL?: number
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  })
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  })

  if (errors.length > 0) {
    throw new Error(errors.toString())
  }
  return validatedConfig
}
