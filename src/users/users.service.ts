import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity.js';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findOneWithProfile(id: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: { id: id },
      relations: {
        profile: true,
      },
    });
  }

  async findOne(id: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { id: id } });
  }

  async findById(id: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { id } });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } });
  }

  async remove(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }
}
