# node-nest-clean-arch-starter

> A production-ready NestJS starter built on Clean / Hexagonal Architecture, multi-tenancy, and full regulatory compliance out of the box.

---

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Feature Set](#feature-set)
- [Security & Compliance](#security--compliance)
- [Observability (OpenTelemetry)](#observability-opentelemetry)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Docker](#docker)
- [Environment Variables](#environment-variables)
- [API Reference](#api-reference)
- [Database & Migrations](#database--migrations)
- [Testing](#testing)
- [Release Workflow](#release-workflow)

---

## Overview

This template gives you a fully-wired Node.js backend that you can clone and start shipping features from day one. Everything that is the same across every serious SaaS product — authentication, multi-tenancy, email, rate limiting, security hardening, GDPR/LGPD compliance — is already built, tested, and documented.

---

## Tech Stack

| Layer            | Technology        | Version |
| ---------------- | ----------------- | ------- |
| Runtime          | Node.js           | ≥ 24    |
| Framework        | NestJS            | 11      |
| Language         | TypeScript        | 6       |
| HTTP Server      | Fastify           | 5       |
| ORM              | TypeORM           | 0.3     |
| Database         | PostgreSQL        | —       |
| Package Manager  | pnpm              | 10      |
| Compiler         | SWC               | —       |
| Cache / Sessions | Redis             | 7       |
| Observability    | OpenTelemetry SDK | 0.217   |
| Testing          | Jest              | 30      |
| Email            | Nodemailer + MJML | —       |
| Docs             | Swagger / OpenAPI | —       |
| Containers       | Docker / Compose  | —       |

---

## Architecture

The codebase follows **Clean / Hexagonal Architecture** with a strict four-layer model. Dependencies only ever point inward — the domain has no knowledge of infrastructure.

```
┌──────────────────────────────────────────────────────────────┐
│  Presentation   (Controllers, DTOs, Decorators)              │
├──────────────────────────────────────────────────────────────┤
│  Application    (Commands, Queries — CQRS-style)             │
├──────────────────────────────────────────────────────────────┤
│  Domain         (AggregateRoot, Entities, Value Objects,     │
│                  Domain Events, Repository interfaces,       │
│                  Port interfaces, Exceptions)                │
├──────────────────────────────────────────────────────────────┤
│  Infrastructure (TypeORM, Guards, Middleware, Adapters …)    │
└──────────────────────────────────────────────────────────────┘
```

### Key patterns

| Pattern                  | Where                                                                                                                                                         |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **CQRS**                 | Every mutation is a `Command`, every read is a `Query` — both accessed through injected contracts                                                             |
| **Aggregate Root**       | `User` and `Tenant` extend `AggregateRoot`, which records domain events that the Application layer dispatches after persisting                                |
| **Domain Events**        | `AccountCreatedEvent`, `AccountDeletedEvent` — pulled from the aggregate after `save()` and dispatched via `IEventHandler`                                    |
| **Value Objects**        | `Email` and `Password` enforce invariants at construction; `TenantDatabase` encapsulates all six DB-connection fields                                         |
| **Data Mapper**          | TypeORM entities (`*-typeorm.data-mapper.ts`) are completely separate from domain entities                                                                    |
| **Repository pattern**   | Domain depends on typed, semantic interfaces (`findById`, `findByEmail`, `findBySlug`) — no generic `findByParam` leaks into the domain                       |
| **Reconstitute factory** | Domain entities expose a `static reconstitute()` factory used by mappers that bypasses creation-time validation                                               |
| **Policy port**          | `ILoginPolicy` decouples login-security configuration from the `User` entity and application commands; backed by `LoginPolicyAdapter` reading `ConfigService` |
| **Factory providers**    | All dependencies are registered via static `register()` factory methods — zero magic tokens                                                                   |
| **Domain exceptions**    | Every business error extends `BaseException` and carries its own HTTP status code                                                                             |

---

## Feature Set

### Authentication

| Feature            | Details                                                                      |
| ------------------ | ---------------------------------------------------------------------------- |
| Sign up            | Email + strong password (upper-case, digit, special char, 8–100 chars)       |
| Email confirmation | Optional (`REQUIRE_EMAIL_CONFIRMATION`); token sent via MJML email           |
| Login              | Email + password → `accessToken` + `refreshToken` in `httpOnly` cookies      |
| Token refresh      | Silent re-issue when access token expires while refresh token is still valid |
| Logout             | Clears both cookies; records `logoutDate` so replayed tokens are rejected    |
| Forgot password    | Sends a time-limited `securityToken` reset link                              |
| Reset password     | Validates token, updates `passwordHash`, clears lockout state                |
| Account lockout    | Configurable failed-attempt threshold + lockout window (env vars)            |
| Admin block        | Admins can block individual user accounts                                    |

### Multi-tenancy

- **Per-schema PostgreSQL isolation** — each tenant gets its own PostgreSQL schema inside the same database.
- **Tenant resolution** supports two modes, toggled by `MULTI_SCHEMA`:
  - `true` — resolves the tenant from the `tenant_id` request header.
  - `false` — uses a single fixed tenant defined by `TENANT_*` env vars (ideal for single-product apps).
- **Tenant registration** provisions a new schema, runs migrations, and creates the first admin user automatically.

### Email

Emails are rendered with **MJML** (responsive HTML) and delivered via **Nodemailer**. Three transactional templates are wired up:

| Event                    | Template trigger             |
| ------------------------ | ---------------------------- |
| Account created          | Welcome + confirm-email link |
| Account confirmed        | Welcome email                |
| Password reset requested | Reset-password link          |

### API Documentation

Swagger UI is served at `/docs` and reflects all endpoints, request/response schemas, and bearer-auth requirements.

---

## Security & Compliance

This starter is built with security and regulatory compliance as first-class concerns.

### OWASP Top 10

| ID  | Control                   | Implementation                                                                                           |
| --- | ------------------------- | -------------------------------------------------------------------------------------------------------- |
| A02 | Cryptographic Failures    | Cookies set with `httpOnly`, `secure`, `sameSite: strict`, `path: /`                                     |
| A03 | Injection                 | TypeORM parameterized queries throughout; no raw string concatenation                                    |
| A04 | Insecure Design           | Domain-layer validation, strong-password regex, lockout by design                                        |
| A05 | Security Misconfiguration | `@fastify/helmet` enabled — CSP, HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy and more |
| A07 | Auth Failures             | Forgot-password endpoint never reveals whether an email is registered (silent success)                   |
| A07 | Auth Failures             | Account lockout after configurable failed attempts; admin-block capability                               |
| A08 | Data Integrity            | `ValidationPipe` with `whitelist: true`, `forbidNonWhitelisted: true`, `forbidUnknownValues: true`       |
| A09 | Logging & Monitoring      | `AuditLogService` writes structured JSON audit entries for every security domain event                   |

### GDPR (EU) & LGPD (Brazil)

| Article | Right             | Implementation                                                                                                                                                            |
| ------- | ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Art. 7  | Consent           | `consentAccepted: boolean` required at sign-up; `consentDate` timestamp persisted on the user record                                                                      |
| Art. 17 | Right to Erasure  | `DELETE /account/me` — anonymizes all PII fields in-place (name → placeholder, email → `deleted-{id}@deleted.invalid`, password hash cleared) and soft-deletes the record |
| Art. 20 | Data Portability  | `GET /account/me/data` — returns a structured JSON export of every personal field stored about the user                                                                   |
| Art. 25 | Privacy by Design | Consent gate, erasure, and portability are domain-layer concerns — not middleware bolted on externally                                                                    |

### Rate Limiting

`@nestjs/throttler` is applied globally. Configure the window and limit via:

```env
THROTTLER_TTL=60000   # window in ms
THROTTLER_LIMIT=10    # max requests per window
```

---

## Observability (OpenTelemetry)

The application ships a fully configured **OpenTelemetry** (OTEL) stack that emits **traces**, **metrics**, and is ready to forward **logs** to any OTLP-compatible backend — with zero code changes.

### Architecture

```
NestJS App
  └─ OTEL SDK (auto-instrumentation)
       ├─ Traces  ──OTLP HTTP──▶  OTel Collector ──▶ Jaeger (dev) / Datadog / Elastic / New Relic / …
       └─ Metrics ──OTLP HTTP──▶  OTel Collector ──▶ Prometheus scrape / Grafana Mimir / …
```

The **OpenTelemetry Collector** (`otel/opentelemetry-collector-contrib`) acts as the single fan-out point. It decouples the application from any specific APM vendor — switching backends is a collector config change, not a code change.

### What is auto-instrumented

| Signal  | Instrumented scope                                                                       |
| ------- | ---------------------------------------------------------------------------------------- |
| Traces  | Fastify HTTP requests, PostgreSQL queries (`pg`), internal NestJS module calls           |
| Metrics | HTTP request durations, active connections, Node.js runtime (event loop, GC, heap)       |
| Logs    | Structured JSON written by `AuditLogService` — collected by the Collector's log receiver |

### Enabling telemetry

Set the following environment variables (see `.env.example` for the full list):

```env
OTEL_ENABLED=true
OTEL_SERVICE_NAME=my-service
OTEL_EXPORTER_OTLP_ENDPOINT=http://otel-collector:4318   # or any OTLP endpoint
```

When `OTEL_ENABLED` is `false` (the default), the bootstrap is a no-op — no packages are loaded and there is **zero runtime overhead**.

### Connecting to an APM backend

Edit `otel-collector-config.yaml` and uncomment the relevant exporter block:

| Backend            | Exporter key         | Auth env var               |
| ------------------ | -------------------- | -------------------------- |
| **Datadog**        | `datadog`            | `DATADOG_API_KEY`          |
| **New Relic**      | `otlphttp/newrelic`  | `NEW_RELIC_LICENSE_KEY`    |
| **Elastic APM**    | `otlphttp/elastic`   | `ELASTIC_APM_SECRET_TOKEN` |
| **Grafana Cloud**  | `otlphttp/grafana`   | `GRAFANA_CLOUD_TOKEN`      |
| **Honeycomb**      | `otlphttp/honeycomb` | `HONEYCOMB_API_KEY`        |
| **Jaeger** (local) | `otlp/jaeger`        | —                          |

Wire the chosen exporter into `service.pipelines.traces.exporters` (and `metrics` / `logs` as needed). No application restart is required — only the collector needs to reload.

### Local trace visualisation

When running via Docker Compose, Jaeger is available at **[http://localhost:16686](http://localhost:16686)**.

---

## Project Structure

```
src/
├── account/
│   ├── application/
│   │   ├── commands/          # ConfirmAccount, CreateAccount, DeleteAccount,
│   │   │                      # Login, Logout, RefreshToken, RequestResetPassword,
│   │   │                      # ResendConfirmation, ValidateSecurityToken, ...
│   │   └── queries/           # GetUser, ExportUserData
│   ├── domain/
│   │   └── exceptions/        # Account-context exceptions (consent, credentials, …)
│   ├── infra/
│   │   ├── database/typeorm/queries/
│   │   └── ioc/providers/     # commands/ + queries/ factory providers
│   └── presentation/
│       ├── controllers/       # AccountController, AccountAuthenticatedController
│       └── dtos/              # Request & response DTOs
│
└── shared/
    ├── application/
    │   ├── commands/          # TenantRegisterCommand
    │   └── queries/tenants/   # GetTenantById, GetTenantByHeader
    ├── domain/
    │   ├── entities/          # DomainEntity (base), AggregateRoot, User, Tenant
    │   ├── events/            # DomainEvent interface, AccountCreatedEvent,
    │   │                      # AccountDeletedEvent, EventTypes enum
    │   ├── exceptions/        # Shared exceptions (token, slug, tenant,
    │   │                      # auth failures, …)
    │   ├── repositories/      # Semantic IUserRepository, ITenantRepository
    │   └── value-objects/     # Email, Password, TenantDatabase VOs
    └── infra/
        ├── audit/             # AuditLogService (OWASP A09)
        ├── config/            # env.validation.ts, LoginPolicyAdapter
        ├── contracts/         # IDatabase, IEventHandler, IHashGenerator,
        │                      # ILoginPolicy, …
        ├── database/typeorm/
        │   ├── application/
        │   │   ├── data-mappers/   # UserTypeormDataMapper
        │   │   └── migrations/     # SQL migration files
        │   └── repositories/application/
        │       └── mappers/        # UserTypeormMapper (uses User.reconstitute)
        ├── events/            # NestJsEventHandlerAdapter
        ├── filters/           # HttpExceptionFilter
        ├── guards/            # JwtAuthGuard
        ├── ioc/providers/     # All shared provider factories (incl. LoginPolicyProvider)
        ├── middlewares/       # AuthMiddleware (token validation + silent refresh)
        └── telemetry/         # otel.bootstrap.ts — OTEL SDK init (traces + metrics)
```

> The `test/` directory mirrors the `src/` structure — test files live outside the source tree so IDE tooling and coverage reports are always clean.

```
test/
├── account/application/commands/   # create-account, login command specs
└── shared/domain/entities/         # entity, user specs
```

---

## Getting Started

### Prerequisites

- Node.js ≥ 24
- pnpm 10
- PostgreSQL (running locally or via a connection string)

### 1. Clone and install

```bash
git clone https://github.com/nowayhecodes/node-nest-clean-arch-starter.git
cd node-nest-clean-arch-starter
pnpm install
```

### 2. Configure environment

```bash
cp .env.example .env
# edit .env with your database credentials, JWT secret, and SMTP settings
```

### 3. Run migrations

```bash
pnpm migration:run
```

### 4. Start the server

```bash
# development (watch + debug)
pnpm start:dev

# production
pnpm build && pnpm start:prod
```

The API will be available at `http://localhost:3000`.
Swagger docs at `http://localhost:3000/docs`.

---

## Docker

A production-ready multi-stage `Dockerfile` and a complete `docker-compose.yaml` are included.

### Services

| Service          | Image                                  | Purpose                               | Port(s)                                           |
| ---------------- | -------------------------------------- | ------------------------------------- | ------------------------------------------------- |
| `app`            | Built from `Dockerfile`                | NestJS API                            | `3000`                                            |
| `postgres`       | `postgres:16-alpine`                   | Tenant-manager + tenant DBs           | `5432`                                            |
| `redis`          | `redis:7-alpine`                       | Cache / session store (ready to wire) | `6379`                                            |
| `otel-collector` | `otel/opentelemetry-collector-contrib` | OTLP fan-out to APM backends          | `4317` (gRPC), `4318` (HTTP), `8889` (Prometheus) |
| `jaeger`         | `jaegertracing/all-in-one`             | Local trace UI                        | `16686`                                           |

### Running the full stack

```bash
# First run — build the app image and start all services
docker compose up --build

# Subsequent runs (detached)
docker compose up -d

# Stop everything and remove volumes
docker compose down -v
```

### Building the image only

```bash
docker build --target production -t nest-app .
```

### Dockerfile stages

| Stage        | Purpose                                       |
| ------------ | --------------------------------------------- |
| `deps`       | Install all dependencies (dev + prod)         |
| `builder`    | Compile TypeScript → `dist/`                  |
| `production` | Lean image — only prod dependencies + `dist/` |

The production image runs as a **non-root user** (`nestjs:nodejs`) to satisfy container security requirements.

---

## Environment Variables

| Variable                      | Required | Default                 | Description                                    |
| ----------------------------- | -------- | ----------------------- | ---------------------------------------------- |
| `NODE_ENV`                    | ✅       | —                       | `development` \| `test` \| `production`        |
| `PORT`                        | ✅       | —                       | HTTP server port                               |
| `FRONTEND_URL`                | ✅       | —                       | Frontend base URL (used in emails)             |
| `ALLOWED_ORIGINS`             | ✅       | —                       | Comma-separated CORS-allowed origins           |
| `JWT_TOKEN_SECRET`            | ✅       | —                       | Secret for signing all JWT tokens              |
| `ACCESS_TOKEN_EXPIRATION`     | ✅       | —                       | e.g. `15m`                                     |
| `REFRESH_TOKEN_EXPIRATION`    | ✅       | —                       | e.g. `7d`                                      |
| `SECURITY_TOKEN_EXPIRATION`   | ✅       | —                       | e.g. `24h`                                     |
| `DB_HOST`                     | ✅       | —                       | Tenant-manager PostgreSQL host                 |
| `DB_PORT`                     | ✅       | —                       | Tenant-manager PostgreSQL port                 |
| `DB_USER`                     | ✅       | —                       | Tenant-manager PostgreSQL user                 |
| `DB_PASS`                     | ✅       | —                       | Tenant-manager PostgreSQL password             |
| `DB_NAME`                     | ✅       | —                       | Tenant-manager database name                   |
| `DB_LOGGING`                  | ☑️       | `false`                 | Enable TypeORM query logging                   |
| `MULTI_SCHEMA`                | ✅       | —                       | `true` = multi-tenant, `false` = single-tenant |
| `TENANT_ID`                   | ☑️       | —                       | Single-tenant fallback UUID                    |
| `TENANT_NAME`                 | ☑️       | —                       | Single-tenant fallback name                    |
| `TENANT_SLUG`                 | ☑️       | —                       | Single-tenant fallback slug                    |
| `TENANT_URL`                  | ☑️       | —                       | Single-tenant fallback URL                     |
| `TENANT_DB_HOST`              | ✅       | —                       | Application database host                      |
| `TENANT_DB_PORT`              | ✅       | —                       | Application database port                      |
| `TENANT_DB_USER`              | ✅       | —                       | Application database user                      |
| `TENANT_DB_PASS`              | ✅       | —                       | Application database password                  |
| `TENANT_DB_NAME`              | ✅       | —                       | Application database name                      |
| `TENANT_DB_SCHEMA`            | ✅       | —                       | Application database schema                    |
| `THROTTLER_TTL`               | ✅       | —                       | Rate-limit window in milliseconds              |
| `THROTTLER_LIMIT`             | ✅       | —                       | Max requests per window                        |
| `MAIL_FROM`                   | ✅       | —                       | SMTP sender address                            |
| `MAIL_HOST`                   | ✅       | —                       | SMTP host                                      |
| `MAIL_PORT`                   | ✅       | —                       | SMTP port                                      |
| `MAIL_USER`                   | ✅       | —                       | SMTP username                                  |
| `MAIL_PASS`                   | ✅       | —                       | SMTP password                                  |
| `MAIL_TO`                     | ☑️       | —                       | Override all outgoing recipients (dev only)    |
| `LOGIN_MAX_ATTEMPTS`          | ☑️       | `5`                     | Failed logins before lockout                   |
| `LOGIN_LOCKOUT_MINUTES`       | ☑️       | `15`                    | Lockout duration in minutes                    |
| `REQUIRE_EMAIL_CONFIRMATION`  | ☑️       | `false`                 | Require email confirmation before login        |
| `REDIS_HOST`                  | ☑️       | `localhost`             | Redis hostname                                 |
| `REDIS_PORT`                  | ☑️       | `6379`                  | Redis port                                     |
| `REDIS_PASS`                  | ☑️       | —                       | Redis password                                 |
| `OTEL_ENABLED`                | ☑️       | `false`                 | Enable OpenTelemetry traces + metrics          |
| `OTEL_SERVICE_NAME`           | ☑️       | `nest-app`              | Service name reported to APM                   |
| `OTEL_EXPORTER_OTLP_ENDPOINT` | ☑️       | `http://localhost:4318` | OTLP HTTP collector endpoint                   |
| `OTEL_EXPORTER_OTLP_HEADERS`  | ☑️       | —                       | Comma-separated `key=value` auth headers       |
| `OTEL_METRIC_EXPORT_INTERVAL` | ☑️       | `30000`                 | Metric export interval in milliseconds         |

✅ required &nbsp;&nbsp; ☑️ optional

---

## API Reference

All endpoints are documented interactively at `/docs`. A summary:

### Public endpoints (`/account`)

| Method | Path                                   | Description                                   |
| ------ | -------------------------------------- | --------------------------------------------- |
| `POST` | `/account/sign-up`                     | Register a new user (consent required)        |
| `POST` | `/account/login`                       | Authenticate and receive tokens               |
| `POST` | `/account/refresh-token`               | Exchange refresh token for a new access token |
| `POST` | `/account/confirm-account`             | Confirm email address                         |
| `POST` | `/account/resend-account-confirmation` | Resend confirmation email                     |
| `POST` | `/account/validate-security-token`     | Check if a security token is still valid      |
| `POST` | `/account/forgot-password`             | Request a password-reset email                |
| `POST` | `/account/reset-password`              | Apply a new password using the reset token    |

### Authenticated endpoints (`/account` — Bearer / cookie required)

| Method   | Path               | Description                                |
| -------- | ------------------ | ------------------------------------------ |
| `GET`    | `/account/me`      | Get current user profile                   |
| `GET`    | `/account/me/data` | Export all personal data (GDPR / LGPD)     |
| `DELETE` | `/account/me`      | Anonymize and delete account (GDPR / LGPD) |
| `POST`   | `/account/logout`  | Invalidate session                         |

### Tenant endpoints (`/tenant`)

| Method | Path               | Description                                |
| ------ | ------------------ | ------------------------------------------ |
| `POST` | `/tenant/register` | Provision a new tenant schema + admin user |

---

## Database & Migrations

TypeORM manages two separate database connections:

| Connection                           | Purpose                                                     |
| ------------------------------------ | ----------------------------------------------------------- |
| **Tenant Manager** (`DB_*` vars)     | Stores the `tenants` table in the `public` schema           |
| **Application** (`TENANT_DB_*` vars) | Per-tenant schema with `users` and other application tables |

### Migration scripts

```bash
pnpm migration:run      # apply all pending migrations
pnpm migration:revert   # revert the last migration
pnpm migration:drop     # drop all tables (destructive — dev only)
```

---

## Testing

Test files live under `test/` (mirroring `src/`) and are run with Jest + SWC for near-instant compilation.

```bash
pnpm test                 # run all tests
pnpm test --coverage      # run with coverage report
```

Coverage is enforced at **100%** on all core domain entities and application commands. Jest is configured to fail the build if any threshold is not met.

```
Tests:  55 passed
100%   Statements | Branches | Functions | Lines
```

### What is tested

| Suite                            | Key assertions                                                                                                 |
| -------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| `entity.spec.ts`                 | `AggregateRoot` lifecycle — id generation, `update()`, `delete()`, `pullDomainEvents()`                        |
| `user.spec.ts`                   | `User.create()` validation via VOs, `reconstitute()`, `login()` throw paths, lockout, anonymize, domain events |
| `login.command.spec.ts`          | Happy path, user-not-found, wrong password — all via `ILoginPolicy` mock                                       |
| `create-account.command.spec.ts` | Consent gate, duplicate email, successful creation + event dispatch                                            |

### Mock strategy

- `jest-mock-extended` generates fully-typed mocks for all repository and service interfaces.
- No database connection or HTTP server is needed to run the test suite.

---

## Release Workflow

Releases are automated with **semantic-release** following the [Conventional Commits](https://www.conventionalcommits.org/) specification.

| Commit type                  | Release type |
| ---------------------------- | ------------ |
| `fix:`                       | Patch        |
| `feat:`                      | Minor        |
| `feat!:` / `BREAKING CHANGE` | Major        |

Git hooks are enforced via **Husky** + **commitlint** to ensure every commit message conforms to the standard before it reaches the repository.

---

## License

MIT
