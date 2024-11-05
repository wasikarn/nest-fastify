import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

async function bootstrap(): Promise<void> {
  const app: NestFastifyApplication =
    await NestFactory.create<NestFastifyApplication>(
      AppModule,
      new FastifyAdapter(),
      {
        bufferLogs: true,
      },
    );

  await app.listen(process.env.PORT ?? 3000);
}

// noinspection JSIgnoredPromiseFromCall
bootstrap();
