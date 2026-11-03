import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRoles } from '../../common/constants.js';
import { ROLES_KEY } from '../../roles/roles.decorator.js';

interface JwtUser {
  sub: string;
  email: string;
  role: UserRoles;
}

interface AuthRequest extends Request {
  user: JwtUser;
}

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // Roles defined on route/controller
    const requiredRoles = this.reflector.getAllAndOverride<UserRoles[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    // If no roles specified, allow access
    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest<AuthRequest>();
    const user = request.user;

    // If user is missing (JWT guard not applied)
    if (!user || !user.role) {
      return false;
    }

    // Super admin can access everything
    if (user.role === UserRoles.SUPER_ADMIN) {
      return true;
    }

    // Admin can access admin-authorized routes
    if (user.role === UserRoles.ADMIN) {
      return requiredRoles.includes(UserRoles.ADMIN);
    }

    // debugging
    console.log(user.role);

    // Check if user's role is allowed
    return requiredRoles.includes(user.role);
  }
}
