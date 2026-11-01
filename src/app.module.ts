import { Module } from '@nestjs/common';
import { createObserveModule } from '@nestjs/observe';
import { UsersModule } from './users/users.module.js';
import { ConfigService } from './common/config/config.service.js';
import { ConfigModule } from './common/config/config.module.js';
import { DatabaseModule } from './common/database/database.module.js';

export const { ObserveModule, ObserveInstrument } = createObserveModule();

@Module({
  imports: [
    // Distributed tracing, auto-correlated logs, request/job metrics, error
    // telemetry, alarms, and more — out of the box. Sign up at https://observe.nestjs.com
    ObserveModule.forRoot({
      appKey: 'YOUR_APP_KEY',
      appSecret: 'YOUR_APP_SECRET',
      serviceId: 'work-nest-api',
    }),
    UsersModule,
    ConfigModule,
    DatabaseModule,
  ],
  controllers: [],
  providers: [ConfigService],
})
export class AppModule {}
