import { randomBytes, randomUUID } from 'crypto'
import { BaseCommand } from '~/shared/application/commands/base'
import { Tenant, User } from '~/shared/domain/entities'
import { EventTypes } from '~/shared/domain/events/event-types'
import { AccountCreatedNotificationPayload } from '~/shared/domain/events/types'
import { SlugAlreadyExistException } from '~/shared/domain/exceptions'
import { ITenantRepository } from '~/shared/domain/repositories/public/tenant.repository'
import { ICryptography } from '~/shared/infra/contracts/cryptography'
import { IEventHandler } from '~/shared/infra/contracts/event-handler'
import { IHashGenerator } from '~/shared/infra/contracts/hash-generator'
import { ITokenGenerator } from '~/shared/infra/contracts/token-generator'
import { UserTypeormDataMapper } from '~/shared/infra/database/typeorm/application/data-mappers'
import { UserTypeormMapper } from '~/shared/infra/database/typeorm/repositories/application/mappers/user-typeorm.mapper'
import { UserTypeormRepository } from '~/shared/infra/database/typeorm/repositories/application/user.typeorm.repository'
import { TypeormDatabaseAdapter } from '~/shared/infra/database/typeorm/typeorm-database.adapter'

export class TenantRegisterCommand implements TenantRegisterCommand {
  constructor(
    private readonly databaseCredentials: TenantRegisterCommand.DatabaseCredentials,
    private readonly tenantRepository: ITenantRepository,
    private readonly cryptography: ICryptography,
    private readonly hashGenerator: IHashGenerator,
    private readonly securityTokenGenerator: ITokenGenerator,
    private readonly eventHandler: IEventHandler,
  ) {}

  async execute(input: TenantRegisterCommand.Input): TenantRegisterCommand.Output {
    const { admin, tenant } = input

    const slugAlreadyExists = await this.tenantRepository.findBySlug(tenant.slug)
    if (slugAlreadyExists) throw new SlugAlreadyExistException()

    const username = this.userNameGenerator(tenant.slug)
    const password = this.generateRandomPassword()
    const databasePassword = this.cryptography.encrypt(password)

    const newTenant = Tenant.create({
      databaseHost: this.databaseCredentials.databaseHost,
      databaseName: this.databaseCredentials.databaseName,
      databasePassword,
      databasePort: this.databaseCredentials.databasePort,
      databaseSchema: tenant.slug,
      databaseUsername: username,
      name: tenant.name,
      slug: tenant.slug,
      url: this.urlGenerator(tenant.slug),
    })

    const applicationConnection = new TypeormDatabaseAdapter({
      config: {
        type: 'postgres',
        host: this.databaseCredentials.databaseHost,
        port: this.databaseCredentials.databasePort,
        username,
        password,
        database: this.databaseCredentials.databaseName,
        schema: tenant.slug,
        migrations: [`${__dirname}/../../infra/database/typeorm/application/migrations/*{.ts,.js}`],
        entities: [`${__dirname}/../../infra/database/typeorm/application/data-mappers/*{.ts,.js}`],
        logging: false,
      },
    })

    try {
      await this.tenantRepository.createDatabaseRole({ username, password })
      const createdTenant = await this.tenantRepository.save(newTenant)
      await this.tenantRepository.createSchema({
        schema: newTenant.database.schema,
        username,
      })
      await applicationConnection.connect()
      await applicationConnection.runMigrations()

      const passwordHash = this.hashGenerator.hash(admin.password)
      const userId = randomUUID()
      const securityToken = this.securityTokenGenerator.encode({
        tenantId: createdTenant.id,
        id: userId,
        email: admin.email,
      })

      const user = User.create({
        id: userId,
        email: admin.email,
        firstName: admin.firstName,
        lastName: admin.lastName,
        language: admin.language ?? 'en-US',
        timezone: admin.timezone ?? 'UTC',
        passwordHash,
        password: admin.password,
        securityToken,
        consentDate: new Date(),
      })

      const userRepository = new UserTypeormRepository(
        applicationConnection.getConnection(),
        UserTypeormDataMapper,
        new UserTypeormMapper(),
      )
      await userRepository.save(user)
      user.pullDomainEvents() // clear domain events after persisting

      await this.eventHandler.send<AccountCreatedNotificationPayload>({
        event: EventTypes.ACCOUNT_CONFIRMATION,
        payload: {
          email: user.email,
          firstName: user.firstName,
          url: `${newTenant.url}/confirm-email?securityToken=${securityToken}`,
          language: user.language,
        },
      })

      await applicationConnection.disconnect()

      return {
        tenant: {
          id: newTenant.id,
          name: newTenant.name,
          slug: newTenant.slug,
          url: newTenant.url,
        },
        admin: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
        },
      }
    } catch (error) {
      await this.tenantRepository.dropSchema(newTenant.database.schema)
      await this.tenantRepository.deleteDatabaseRole(username)
      await this.tenantRepository.softDelete(newTenant.id)
      throw error
    }
  }

  private urlGenerator(slug: string) {
    return `https://${slug}.boiler.sof.to`
  }

  private userNameGenerator(slug: string) {
    return `user_${slug}`
  }

  private generateRandomPassword() {
    const PASSWORD_SIZE = 20
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    const bytes = randomBytes(PASSWORD_SIZE)
    let password = ''
    for (let i = 0; i < PASSWORD_SIZE; i++) {
      const randomIndex = bytes[i] % chars.length
      password += chars[randomIndex]
    }
    return password
  }
}

export namespace TenantRegisterCommand {
  export interface Contract extends BaseCommand<Input, Output> {}
  export type Input = { tenant: InputTenant; admin: InputAdmin }
  export type InputTenant = { name: string; slug: string }
  export type InputAdmin = {
    email: string
    firstName: string
    lastName: string
    password: string
    language?: string
    timezone?: string
  }
  export type Output = Promise<Response>
  export type Response = {
    tenant: { id: string; name: string; slug: string; url: string }
    admin: { id: string; email: string; firstName: string; lastName: string }
  }
  export type DatabaseCredentials = {
    databaseHost: string
    databaseName: string
    databasePort: number
  }
}
