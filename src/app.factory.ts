import { INestApplication, ValidationPipe } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { Environment } from '~/shared/infra/config/environment.enum'
import { HttpExceptionFilter } from '~/shared/infra/filters/exception.filter'

export const appFactory = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle('SOFTO - Boilerplate')
    .setDescription('NodeJS + NestJS Boilerplate')
    .setVersion('1.0')
    .addBearerAuth()
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('docs', app, document)
  app.useGlobalFilters(new HttpExceptionFilter())
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      forbidNonWhitelisted: true,
      whitelist: true,
      always: true,
      forbidUnknownValues: true,
    }),
  )
  const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',').map((origin) => new RegExp(origin))
  app.enableCors({
    origin: allowedOrigins,
    credentials: [Environment.DEV.toString(), Environment.TEST.toString()].includes(`${process.env.NODE_ENV}`),
  })
}
