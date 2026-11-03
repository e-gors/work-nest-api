import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { UserRoles } from '../../common/constants.js';

interface JwtUser {
  id: string;
  email: string;
  role: UserRoles;
}

interface AuthRequest {
  headers: {
    'x-app-type'?: string;
    [key: string]: string | undefined;
  };
  user?: JwtUser;
}

@Injectable()
export class AppTypeAndRoleGuard implements CanActivate {
  private allowedRolesByApp: Record<string, UserRoles[]> = {
    admin: [UserRoles.ADMIN, UserRoles.MANAGER, UserRoles.SUPER_ADMIN],
    worker: [UserRoles.WORKER],
    customer: [UserRoles.CUSTOMER],
    guest: [UserRoles.GUEST],
  };

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<AuthRequest>();
    const appType = request.headers['x-app-type'];

    if (!appType || !this.allowedRolesByApp[appType]) {
      throw new UnauthorizedException('Invalid app type');
    }

    const user = request.user; // now typed as JwtUser | undefined

    if (!user) {
      throw new UnauthorizedException('User not authenticated');
    }

    const allowedRoles = this.allowedRolesByApp[appType];

    if (!allowedRoles.includes(user.role)) {
      throw new UnauthorizedException(
        `This account cannot access the ${appType} app`,
      );
    }

    return true;
  }
}
