import { Module } from '@nestjs/common';
import { createObserveModule } from '@nestjs/observe';
import { UsersModule } from './users/users.module.js';
import { ConfigModule } from './common/config/config.module.js';
import { DatabaseModule } from './common/database/database.module.js';
import { ProfilesModule } from './profiles/profiles.module.js';
import { RolesModule } from './roles/roles.module.js';
import { WorkerProfilesModule } from './worker_profiles/worker_profiles.module.js';
import { AuthModule } from './auth/auth.module.js';
import { UserSessionsModule } from './user_sessions/user_sessions.module.js';

export const { ObserveModule, ObserveInstrument } = createObserveModule();

@Module({
  imports: [
    // Distributed tracing, auto-correlated logs, request/job metrics, error
    // telemetry, alarms, and more — out of the box. Sign up at https://observe.nestjs.com
    // ObserveModule.forRoot({
    //   appKey: 'YOUR_APP_KEY',
    //   appSecret: 'YOUR_APP_SECRET',
    //   serviceId: 'work-nest-api',
    // }),
    UsersModule,
    ConfigModule,
    DatabaseModule,
    ProfilesModule,
    RolesModule,
    WorkerProfilesModule,
    AuthModule,
    UserSessionsModule,
  ],
  controllers: [],
})
export class AppModule {}
