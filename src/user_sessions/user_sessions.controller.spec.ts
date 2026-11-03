import { Test, TestingModule } from '@nestjs/testing';
import { UserSessionsController } from './user_sessions.controller.js';
import { UserSessionsService } from './user_sessions.service.js';

describe('UserSessionsController', () => {
  let controller: UserSessionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserSessionsController],
      providers: [UserSessionsService],
    }).compile();

    controller = module.get<UserSessionsController>(UserSessionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
