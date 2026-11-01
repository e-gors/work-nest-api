import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { UserRoles } from '../../common/constants.js';

export class CreateRoleDto {
  @IsEnum(UserRoles, {
    message: 'Invalid role. Please provide a valid user role.',
  })
  @IsNotEmpty({ message: 'Role name is required' })
  name: UserRoles;
}
