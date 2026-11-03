import { Module } from '@nestjs/common';
import { ProfilesService } from './profiles.service.js';
import { ProfilesController } from './profiles.controller.js';
import { Profile } from './entities/profile.entity.js';
import { User } from '../users/entities/user.entity.js';
import { WorkerProfile } from '../worker_profiles/entities/worker_profile.entity.js';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Profile, User, WorkerProfile])],
  controllers: [ProfilesController],
  providers: [ProfilesService],
})
export class ProfilesModule {}
