import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { ConfigService } from './config.service.js';
import { validationSchema } from './validation.schema.js';

@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      validationSchema,
    }),
  ],
  providers: [ConfigService],
  exports: [ConfigService, NestConfigModule],
})
export class ConfigModule {}
