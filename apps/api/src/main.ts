import { NestFactory } from '@nestjs/core';
import { AppModule, ObserveInstrument } from './app.module.js';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { filterLogLevels } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    instrument: ObserveInstrument,
    logger: filterLogLevels(process.env.LOG_LEVEL ?? '>=warn'),
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.enableShutdownHooks();
  const configService = app.get(ConfigService);

  const port = configService.get<number>('PORT') ?? 3001;

  await app.listen(port);
}
await bootstrap();
