import { mock, MockProxy } from 'jest-mock-extended'
import { InvalidCredentialsException } from '~/shared/domain/exceptions'
import { User } from '~/shared/domain/entities'
import { IUserRepository } from '~/shared/domain/repositories/tenant/user.repository'
import { IHashGenerator } from '~/shared/infra/contracts/hash-generator'
import { ILoginPolicy } from '~/shared/infra/contracts/login-policy'
import { ITokenGenerator } from '~/shared/infra/contracts/token-generator'
import { LoginCommand } from '~/account/application/commands/login.command'

const makeUser = () =>
  User.reconstitute({
    id: 'user-1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    passwordHash: 'hashed',
    emailConfirmedDate: new Date(),
    adminBlockedDate: null,
    lockoutEndDate: null,
    accessFailedCount: 0,
    logoutDate: null,
    language: 'en-US',
    timezone: 'UTC',
    securityToken: null,
    avatarImageUploadedDate: null,
    consentDate: new Date(),
  })

const loginPolicy: ILoginPolicy = {
  maxAttempts: 5,
  lockoutMinutes: 15,
  requireEmailConfirmation: false,
}

describe('LoginCommand', () => {
  let userRepository: MockProxy<IUserRepository>
  let hashGenerator: MockProxy<IHashGenerator>
  let accessTokenGenerator: MockProxy<ITokenGenerator>
  let refreshTokenGenerator: MockProxy<ITokenGenerator>
  let sut: LoginCommand

  beforeEach(() => {
    userRepository = mock<IUserRepository>()
    hashGenerator = mock<IHashGenerator>()
    accessTokenGenerator = mock<ITokenGenerator>()
    refreshTokenGenerator = mock<ITokenGenerator>()

    sut = new LoginCommand(userRepository, hashGenerator, accessTokenGenerator, refreshTokenGenerator, loginPolicy)
  })

  it('throws InvalidCredentialsException when user is not found', async () => {
    userRepository.findByEmail.mockResolvedValue(null)

    await expect(sut.execute({ email: 'unknown@example.com', password: 'any' })).rejects.toThrow(
      InvalidCredentialsException,
    )
  })

  it('returns tokens on successful login', async () => {
    const user = makeUser()
    userRepository.findByEmail.mockResolvedValue(user)
    userRepository.save.mockResolvedValue(user)
    hashGenerator.compare.mockReturnValue(true)
    accessTokenGenerator.encode.mockReturnValue('access-token')
    refreshTokenGenerator.encode.mockReturnValue('refresh-token')

    const result = await sut.execute({
      email: user.email,
      password: 'Secret@1',
    })

    expect(result.accessToken).toBe('access-token')
    expect(result.refreshToken).toBe('refresh-token')
    expect(result.id).toBe(user.id)
    expect(result.email).toBe(user.email)
    expect(result.firstName).toBe(user.firstName)
    expect(result.lastName).toBe(user.lastName)
  })

  it('throws InvalidCredentialsException when password does not match', async () => {
    const user = makeUser()
    userRepository.findByEmail.mockResolvedValue(user)
    userRepository.save.mockResolvedValue(user)
    hashGenerator.compare.mockReturnValue(false)

    await expect(sut.execute({ email: user.email, password: 'wrong' })).rejects.toThrow(InvalidCredentialsException)
  })
})
