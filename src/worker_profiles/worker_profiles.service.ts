import { Injectable } from '@nestjs/common';
import { CreateWorkerProfileDto } from './dto/create-worker_profile.dto.js';
import { UpdateWorkerProfileDto } from './dto/update-worker_profile.dto.js';

@Injectable()
export class WorkerProfilesService {
  create(createWorkerProfileDto: CreateWorkerProfileDto) {
    return 'This action adds a new workerProfile';
  }

  findAll() {
    return `This action returns all workerProfiles`;
  }

  findOne(id: number) {
    return `This action returns a #${id} workerProfile`;
  }

  update(id: number, updateWorkerProfileDto: UpdateWorkerProfileDto) {
    return `This action updates a #${id} workerProfile`;
  }

  remove(id: number) {
    return `This action removes a #${id} workerProfile`;
  }
}
