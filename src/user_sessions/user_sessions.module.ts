import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserSessionsController } from './user_sessions.controller.js';
import { UserSessionsService } from './user_sessions.service.js';
import { UserSession } from './entities/user_session.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([UserSession])],
  controllers: [UserSessionsController],
  providers: [UserSessionsService],
  exports: [UserSessionsService],
})
export class UserSessionsModule {}
