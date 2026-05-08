import { ArgumentsHost, Catch, ExceptionFilter, HttpException, Logger } from '@nestjs/common'
import { FastifyReply } from 'fastify'
import { BaseException } from '~/shared/domain/exceptions'
import { Environment } from '~/shared/infra/config/environment.enum'
import { HttpStatusCodeEnum } from '~/shared/infra/constants/http-status-code.enum'

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private logger = new Logger()

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const reply = ctx.getResponse<FastifyReply>()

    if (exception instanceof BaseException) {
      reply.status(exception.statusCode).send({
        errors: exception.customMessage,
        statusText: exception.statusText,
      })
    } else if (exception instanceof HttpException) {
      if (exception.getStatus() === HttpStatusCodeEnum.BAD_REQUEST) {
        const { message } = exception.getResponse() as any
        reply.status(exception.getStatus()).send({
          errors: this.filterDtoValidation(message),
          statusText: exception.name,
        })
        return
      }
      reply.status(exception.getStatus()).send({
        errors: exception.message,
        statusText: exception.name,
      })
    } else {
      this.logger.error(exception)
      reply.status(HttpStatusCodeEnum.INTERNAL_SERVER_ERROR).send({
        errors: process.env.NODE_ENV === Environment.PROD ? HttpStatusCodeEnum.INTERNAL_SERVER_ERROR : exception?.stack,
        statusText: exception?.name,
      })
    }
  }

  private filterDtoValidation(errors: string[]): any {
    if (Array.isArray(errors)) {
      const obj = {}
      errors.forEach((error) => {
        const [key] = error.split(' ')
        const message = error.replace(`${key} `, '')
        const content = obj[key] || []
        content.push(message)
        obj[key] = content
      })
      return obj
    }
  }
}
