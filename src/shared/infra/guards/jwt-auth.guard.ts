import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Observable } from 'rxjs'
import { AuthMiddleware } from '~/shared/infra/middlewares/auth.middleware'

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly authMiddleware: AuthMiddleware) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest()
    const response = context.switchToHttp().getResponse()
    return new Promise((resolve, reject) => {
      this.authMiddleware.use(request, response, (err) => {
        if (err) {
          return reject(err)
        }
        resolve(true)
      })
    })
  }
}
