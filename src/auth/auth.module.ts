import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { User } from '../users/entities/user.entity.js';
import { Profile } from '../profiles/entities/profile.entity.js';
import { UserSession } from '../user_sessions/entities/user_session.entity.js';
import { ConfigModule } from '../common/config/config.module.js';
import { ConfigService } from '../common/config/config.service.js';
import { AuthController } from './auth.controller.js';
import { AuthService } from './auth.service.js';
import { JwtStrategy } from './strategies/jwt.strategy.js';
import { RefreshJwtStrategy } from './strategies/refresh.strategy.js';
import { LocalStrategy } from './strategies/local.strategy.js';
import { UsersService } from '../users/users.service.js';
import { UserSessionsService } from '../user_sessions/user_sessions.service.js';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    TypeOrmModule.forFeature([User, Profile, UserSession]),

    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.jwtSecret,
        signOptions: {
          expiresIn: configService.jwtExpiresIn,
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    RefreshJwtStrategy,
    LocalStrategy,
    UsersService,
    UserSessionsService,
    ConfigService,
  ],
  exports: [AuthService],
})
export class AuthModule {}
