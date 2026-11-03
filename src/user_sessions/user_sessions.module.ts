import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserSessionsController } from './user_sessions.controller.js';
import { UserSessionsService } from './user_sessions.service.js';
import { UserSession } from './entities/user_session.entity.js';
import { ConfigModule } from '../common/config/config.module.js';

@Module({
  imports: [TypeOrmModule.forFeature([UserSession]), ConfigModule],
  controllers: [UserSessionsController],
  providers: [UserSessionsService],
  exports: [UserSessionsService],
})
export class UserSessionsModule {}
