import { mock, MockProxy } from 'jest-mock-extended'
import { ConsentNotAcceptedException, EmailAlreadyExistException } from '~/account/domain/exceptions'
import { User } from '~/shared/domain/entities'
import { EventTypes } from '~/shared/domain/events/event-types'
import { IUserRepository } from '~/shared/domain/repositories/tenant/user.repository'
import { IEventHandler } from '~/shared/infra/contracts/event-handler'
import { IHashGenerator } from '~/shared/infra/contracts/hash-generator'
import { ITokenGenerator } from '~/shared/infra/contracts/token-generator'
import { CreateAccountCommand } from '~/account/application/commands/create-account.command'

const validInput: CreateAccountCommand.Input = {
  email: 'jane@example.com',
  password: 'Secret@1',
  firstName: 'Jane',
  lastName: 'Smith',
  tenantUrl: 'https://app.example.com',
  consentAccepted: true,
}

describe('CreateAccountCommand', () => {
  let userRepository: MockProxy<IUserRepository>
  let hashGenerator: MockProxy<IHashGenerator>
  let eventHandler: MockProxy<IEventHandler>
  let securityTokenGenerator: MockProxy<ITokenGenerator>
  let sut: CreateAccountCommand

  beforeEach(() => {
    userRepository = mock<IUserRepository>()
    hashGenerator = mock<IHashGenerator>()
    eventHandler = mock<IEventHandler>()
    securityTokenGenerator = mock<ITokenGenerator>()

    sut = new CreateAccountCommand(userRepository, hashGenerator, eventHandler, securityTokenGenerator)
  })

  it('throws ConsentNotAcceptedException when consentAccepted is false', async () => {
    await expect(sut.execute({ ...validInput, consentAccepted: false })).rejects.toThrow(ConsentNotAcceptedException)
  })

  it('throws EmailAlreadyExistException when email is already registered', async () => {
    userRepository.findByEmail.mockResolvedValue(
      User.reconstitute({
        id: 'existing-id',
        email: validInput.email,
        firstName: 'Existing',
        lastName: 'User',
        passwordHash: 'hash',
        securityToken: null,
        emailConfirmedDate: null,
        lockoutEndDate: null,
        adminBlockedDate: null,
        avatarImageUploadedDate: null,
        accessFailedCount: 0,
        logoutDate: null,
        language: 'en-US',
        timezone: 'UTC',
        consentDate: null,
      }),
    )

    await expect(sut.execute(validInput)).rejects.toThrow(EmailAlreadyExistException)
  })

  it('creates the user and dispatches account confirmation event', async () => {
    userRepository.findByEmail.mockResolvedValue(null)
    hashGenerator.hash.mockReturnValue('hashed-password')
    securityTokenGenerator.encode.mockReturnValue('security-token')
    userRepository.save.mockImplementation(async (user) => user)
    eventHandler.send.mockResolvedValue(undefined)

    const result = await sut.execute(validInput)

    expect(result.email).toBe(validInput.email)
    expect(result.firstName).toBe(validInput.firstName)
    expect(result.lastName).toBe(validInput.lastName)
    expect(result.id).toBeDefined()
    expect(userRepository.save).toHaveBeenCalledTimes(1)
    expect(eventHandler.send).toHaveBeenCalledWith(expect.objectContaining({ event: EventTypes.ACCOUNT_CONFIRMATION }))
  })

  it('creates the user with provided language and timezone', async () => {
    userRepository.findByEmail.mockResolvedValue(null)
    hashGenerator.hash.mockReturnValue('hashed-password')
    securityTokenGenerator.encode.mockReturnValue('security-token')
    userRepository.save.mockImplementation(async (user) => user)
    eventHandler.send.mockResolvedValue(undefined)

    const result = await sut.execute({
      ...validInput,
      language: 'pt-BR',
      timezone: 'America/Sao_Paulo',
    })

    expect(result.id).toBeDefined()
    expect(userRepository.save).toHaveBeenCalledTimes(1)
  })
})
