import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AuthRequest } from '../auth.controller.js';

const getCurrentUserFromContext = (
  ctx: ExecutionContext,
): AuthRequest['user'] => {
  const request = ctx.switchToHttp().getRequest<AuthRequest>();
  return request.user;
};

export const CurrentUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => {
    return getCurrentUserFromContext(ctx);
  },
);
