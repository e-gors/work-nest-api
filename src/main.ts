import { NestFactory } from '@nestjs/core';
import { AppModule, ObserveInstrument } from './app.module.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    instrument: ObserveInstrument,
  });

  // API prefix
  app.setGlobalPrefix('api/v1');

  await app.listen(process.env.PORT ?? 3000, 'localhost');
}
await bootstrap();
