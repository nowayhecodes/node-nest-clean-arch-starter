import { Inject, Injectable, NestMiddleware } from '@nestjs/common'
import { FastifyReply, FastifyRequest } from 'fastify'
import { User } from '~/shared/domain/entities'
import { ExpiredTokenException, RevokedTokenException } from '~/shared/domain/exceptions'
import { UnauthorizedException } from '~/shared/domain/exceptions/unauthorized.exception'
import { IUserRepository } from '~/shared/domain/repositories/tenant/user.repository'
import { ITokenGenerator } from '~/shared/infra/contracts/token-generator'
import { SharedProviderEnum } from '~/shared/infra/ioc/shared-provider.enum'

@Injectable()
export class AuthMiddleware implements NestMiddleware<FastifyRequest, FastifyReply> {
  constructor(
    @Inject(SharedProviderEnum.ACCESS_TOKEN_GENERATOR)
    private accessToken: ITokenGenerator,
    @Inject(SharedProviderEnum.REPOSITORIES.USER_REPOSITORY)
    private userRepository: IUserRepository,
    @Inject(SharedProviderEnum.REFRESH_TOKEN_GENERATOR)
    private refreshToken: ITokenGenerator,
  ) {}

  async use(request: FastifyRequest & { user: User }, reply: FastifyReply, next: (error?: any) => void) {
    const bearerToken = request.headers.authorization?.split(' ')[1]
    const cookieToken = request.cookies?.['accessToken']
    const refreshTokenCookie = request.cookies?.['refreshToken']
    try {
      const token = bearerToken || cookieToken
      if (!token) throw new UnauthorizedException()
      this.accessToken.validate(token)
      const payload = this.accessToken.decode(token)
      const user = await this.userRepository.findByParam({
        key: 'id',
        value: payload.id,
      })
      if (!user) throw new UnauthorizedException()
      request.user = user
      user.isBlockedByAdmin()
      this.checkRevokedToken({ logoutDate: user.logoutDate, iat: payload.iat })
      next()
    } catch (error) {
      if (error instanceof ExpiredTokenException && cookieToken && refreshTokenCookie) {
        await this.generateCookieRefreshToken({
          cookieToken,
          next,
          refreshToken: refreshTokenCookie,
          reply,
          request,
        })
        return
      }
      next(error)
    }
  }

  private async generateCookieRefreshToken(input: {
    cookieToken: string
    reply: FastifyReply
    next: (error?: any) => void
    refreshToken: string
    request: FastifyRequest & { user: User }
  }) {
    const { cookieToken, reply, next, refreshToken, request } = input
    try {
      this.refreshToken.validate(refreshToken)
      const { id } = this.accessToken.decode(cookieToken)
      const user = await this.userRepository.findByParam({
        key: 'id',
        value: id,
      })
      if (!user) throw new UnauthorizedException()
      request.user = user
      const payload = { id: user.id, email: user.email }
      const newAccessToken = this.accessToken.encode(payload)
      const newRefreshToken = this.refreshToken.encode(payload)
      reply.setCookie('accessToken', newAccessToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        path: '/',
      })
      reply.setCookie('refreshToken', newRefreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        path: '/',
      })
      next()
    } catch (error) {
      if (error instanceof ExpiredTokenException) {
        reply.clearCookie('accessToken')
        reply.clearCookie('refreshToken')
      }
      next(error)
    }
  }

  private checkRevokedToken(input: { logoutDate: Date | null; iat: number }) {
    const { logoutDate, iat } = input
    const revokedAt = logoutDate ? new Date(logoutDate).getTime() : null
    if (revokedAt && iat && iat * 1000 < revokedAt) {
      throw new RevokedTokenException()
    }
  }
}
