import { PartialType } from '@nestjs/mapped-types';
import { CreateUserSessionDto } from './create-user_session.dto.js';

export class UpdateUserSessionDto extends PartialType(CreateUserSessionDto) {}
