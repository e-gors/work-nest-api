import {
  Controller,
  Post,
  UseGuards,
  HttpCode,
  Ip,
  Res,
  Headers,
} from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { User } from '../users/entities/user.entity.js';
import { LocalAuthGuard } from './guards/local-auth.guard.js';
import { UserRoles } from '../common/constants.js';
import { Profile } from '../profiles/entities/profile.entity.js';
import { CurrentUser } from './guards/current-user.decorator.js';
import type { Response } from 'express';

interface AuthenticatedUser {
  id: string;
  email: string;
  role: UserRoles;
  status: string;
  profile?: Profile;
}

export interface AuthRequest extends Request {
  user: AuthenticatedUser;
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // LOGIN
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(200)
  async login(
    @CurrentUser() user: User,
    @Ip() ipAddress: string,
    @Headers('user-agent') userAgent: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return await this.authService.login(user, res, userAgent, ipAddress);
  }
}
