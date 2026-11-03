import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WorkerProfilesService } from './worker_profiles.service.js';
import { CreateWorkerProfileDto } from './dto/create-worker_profile.dto.js';
import { UpdateWorkerProfileDto } from './dto/update-worker_profile.dto.js';

@Controller('worker-profiles')
export class WorkerProfilesController {
  constructor(private readonly workerProfilesService: WorkerProfilesService) {}

  @Post()
  create(@Body() createWorkerProfileDto: CreateWorkerProfileDto) {
    return this.workerProfilesService.create(createWorkerProfileDto);
  }

  @Get()
  findAll() {
    return this.workerProfilesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.workerProfilesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWorkerProfileDto: UpdateWorkerProfileDto) {
    return this.workerProfilesService.update(+id, updateWorkerProfileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.workerProfilesService.remove(+id);
  }
}
