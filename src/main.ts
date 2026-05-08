import '~/shared/infra/telemetry/otel.bootstrap'
import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify'
import fastifyCookie from '@fastify/cookie'
import fastifyHelmet from '@fastify/helmet'
import { appFactory } from '~/app.factory'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter())
  await app.register(fastifyCookie)
  await app.register(fastifyHelmet, {
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", 'data:', 'https:'],
        connectSrc: ["'self'"],
        fontSrc: ["'self'"],
        objectSrc: ["'none'"],
        frameAncestors: ["'none'"],
      },
    },
    crossOriginEmbedderPolicy: false,
  })
  appFactory(app)
  const logger = new Logger()
  app
    .listen(process.env.PORT!, '0.0.0.0')
    .then(() => {
      logger.log(`Server is up and running at http://localhost:${process.env.PORT}/`)
    })
    .catch((err) => {
      logger.fatal(err)
      throw err
    })
}
bootstrap()
