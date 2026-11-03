import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from '../users/entities/user.entity.js';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from '../users/users.service.js';
import { ConfigService } from '../common/config/config.service.js';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { UserSessionsService } from '../user_sessions/user_sessions.service.js';
import { UserSession } from '../user_sessions/entities/user_session.entity.js';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly userSessionService: UserSessionsService,
    private readonly configService: ConfigService,

    @InjectRepository(UserSession)
    private readonly userSessionRepository: Repository<UserSession>,
  ) {}

  async validateUserCredentials(
    email: string,
    password: string,
  ): Promise<User> {
    const user = await this.usersService.findByEmail(email);
    if (!user) throw new UnauthorizedException('Email not found!');

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid)
      throw new UnauthorizedException('Incorrect password!');

    this.checkUserStatus(user);
    return user;
  }

  async login(
    user: User,
    res: Response,
    userAgent?: string,
    ipAddress?: string,
  ): Promise<{ userId: string; accessToken: string }> {
    const payload = { sub: user.id, email: user.email, role: user.role };

    // Generate Access Token
    const accessToken = this.generateAccessToken(payload);

    // Generate Refresh Token
    const refreshToken = this.generateRefreshToken(payload);

    const hashedRefreshToken =
      await this.userSessionService.hashToken(refreshToken);

    await this.userSessionService.createSession(
      user.id,
      hashedRefreshToken,
      userAgent,
      ipAddress,
    );

    this.setRefreshTokenCookie(res, refreshToken);

    return {
      userId: user.id,
      accessToken,
    };
  }

  async findUserById(id: string) {
    return await this.usersService.findById(id);
  }

  private checkUserStatus(user: User) {
    if (user.status === 'pending' && !user.email_verified) {
      throw new ForbiddenException(
        'Please verify your email address before logging in.',
      );
    }

    if (user.status === 'disabled') {
      throw new ForbiddenException(
        'Your account has been deactivated. Please contact support.',
      );
    }
  }

  async refreshTokens(userId: string): Promise<{ accessToken: string }> {
    const user = await this.usersService.findById(userId);
    if (!user) throw new UnauthorizedException('User not found');

    const payload = { sub: user.id, email: user.email, role: user.role };
    const accessToken = this.generateAccessToken(payload);

    return { accessToken };
  }

  private generateAccessToken(payload: any): string {
    return this.jwtService.sign(payload, {
      secret: this.configService.jwtSecret,
      expiresIn: this.configService.jwtExpiresIn,
    });
  }

  private generateRefreshToken(payload: any): string {
    return this.jwtService.sign(payload, {
      secret: this.configService.jwtRefreshSecret,
      expiresIn: this.configService.refreshTokenExpiresIn,
    });
  }

  private setRefreshTokenCookie(res: Response, refreshToken: string) {
    res.cookie('refresh_token', refreshToken, {
      httpOnly: this.configService.isProduction,
      secure: this.configService.isProduction,
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
  }
}
