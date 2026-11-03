import { NestFactory } from '@nestjs/core';
import { AppModule, ObserveInstrument } from './app.module.js';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  // const app = await NestFactory.create(AppModule, {
  //   instrument: ObserveInstrument,
  // });
  const app = await NestFactory.create(AppModule);

  // API prefix
  app.setGlobalPrefix('api/v1');

  // Use cookie parser middleware to read cookies in requests
  app.use(cookieParser());

  await app.listen(process.env.PORT ?? 3000, 'localhost');
}
await bootstrap();
