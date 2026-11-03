import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull, LessThan, MoreThan } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Response } from 'express';
import { UserSession } from './entities/user_session.entity.js';
import { ConfigService } from '../common/config/config.service.js';
@Injectable()
export class UserSessionsService {
  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(UserSession)
    private readonly sessionRepo: Repository<UserSession>,
  ) {}

  // Create a new session (login)
  async createSession(
    userId: string,
    refreshToken: string,
    userAgent?: string,
    ipAddress?: string,
  ): Promise<UserSession> {
    const sessionEntity = this.sessionRepo.create({
      user_id: userId,
      refresh_token: refreshToken,
      user_agent: userAgent ?? null,
      ip_address: ipAddress ?? null,
      expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
    } as Partial<UserSession>);

    return this.sessionRepo.save(sessionEntity);
  }

  // Validate refresh token and session
  async validateSession(
    userId: string,
    refreshToken: string,
  ): Promise<UserSession | null> {
    const sessions = await this.sessionRepo.find({
      where: { user_id: userId, revoked_at: IsNull() },
    });

    for (const session of sessions) {
      // Check expiration
      if (session.expires_at < new Date()) continue;

      const match = await bcrypt.compare(refreshToken, session.refresh_token);
      if (match) return session;
    }

    return null;
  }

  // Revoke one session
  async revokeSession(sessionId: string): Promise<void> {
    await this.sessionRepo.update(sessionId, { revoked_at: new Date() });
  }

  // Revoke all sessions for a user (logout all devices)
  async revokeAllUserSessions(userId: string): Promise<void> {
    await this.sessionRepo.update(
      { user_id: userId },
      { revoked_at: new Date() },
    );
  }

  // Optional: delete expired sessions periodically
  async deleteExpiredSessions(): Promise<void> {
    await this.sessionRepo.delete({ expires_at: LessThan(new Date()) });
  }

  async hashToken(token: string): Promise<string> {
    return bcrypt.hash(token, 10);
  }

  async compareTokens(token: string, hashedToken: string): Promise<boolean> {
    return bcrypt.compare(token, hashedToken);
  }

  // check if current user has active sessions
  // then do not create a new session, just return the existing one
  async checkActiveSessions(userId: string): Promise<boolean> {
    const activeSessions = await this.sessionRepo.count({
      where: {
        user_id: userId,
        revoked_at: IsNull(),
        expires_at: MoreThan(new Date()),
      },
    });
    return activeSessions > 0;
  }
}
