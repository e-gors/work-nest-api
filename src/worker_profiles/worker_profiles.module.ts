import { Module } from '@nestjs/common';
import { WorkerProfilesService } from './worker_profiles.service.js';
import { WorkerProfilesController } from './worker_profiles.controller.js';

@Module({
  controllers: [WorkerProfilesController],
  providers: [WorkerProfilesService],
})
export class WorkerProfilesModule {}
