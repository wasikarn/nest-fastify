import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify'
import compression from '@fastify/compress'
import helmet from '@fastify/helmet'
import fastifyCsrf from '@fastify/csrf-protection'
import secureSession from '@fastify/secure-session'
import fastifyCookie from '@fastify/cookie'

async function bootstrap(): Promise<void> {
  const app: NestFastifyApplication =
    await NestFactory.create<NestFastifyApplication>(
      AppModule,
      new FastifyAdapter({ logger: true }),
      { cors: true },
    )

  await app.register(compression, { encodings: ['gzip', 'deflate'] })
  await app.register(helmet)
  await app.register(fastifyCsrf)
  await app.register(fastifyCookie, {
    secret: process.env.COOKIE_SECRET ?? 'my-secret', // for cookies signature
  })
  await app.register(secureSession, {
    secret:
      process.env.SESSION_SECRET ?? 'averylogphrasebiggerthanthirtytwochars',
    salt: process.env.SESSION_SALT ?? 'mq9hDxBVDbspDR6n',
  })

  await app.listen(process.env.PORT ?? 3000)
}

// noinspection JSIgnoredPromiseFromCall
bootstrap()
