import { Test, TestingModule } from '@nestjs/testing';
import { WorkerProfilesController } from './worker_profiles.controller.js';
import { WorkerProfilesService } from './worker_profiles.service.js';

describe('WorkerProfilesController', () => {
  let controller: WorkerProfilesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WorkerProfilesController],
      providers: [WorkerProfilesService],
    }).compile();

    controller = module.get<WorkerProfilesController>(WorkerProfilesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
