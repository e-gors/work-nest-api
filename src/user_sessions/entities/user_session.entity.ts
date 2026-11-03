import * as bcrypt from 'bcryptjs';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import type { Relation } from 'typeorm';
import { User } from '../../users/entities/user.entity.js';

@Entity('user_sessions')
export class UserSession {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', name: 'user_id' })
  userId: string;

  @Column({ type: 'text', name: 'refresh_token' })
  refreshToken: string;

  @BeforeInsert()
  async hashRefreshTokenBeforeInsert(): Promise<void> {
    if (this.refreshToken && !this.isHashed(this.refreshToken)) {
      this.refreshToken = await bcrypt.hash(this.refreshToken, 10);
    }
  }

  @BeforeUpdate()
  async hashRefreshTokenBeforeUpdate(): Promise<void> {
    if (this.refreshToken && !this.isHashed(this.refreshToken)) {
      this.refreshToken = await bcrypt.hash(this.refreshToken, 10);
    }
  }

  @Column({ nullable: true, name: 'user_agent', type: 'text' })
  userAgent: string;

  @Column({ nullable: true, name: 'ip_address', type: 'text' })
  ipAddress: string;

  @CreateDateColumn({
    type: 'timestamp',
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column({ type: 'timestamp', name: 'expires_at' })
  expiresAt: Date;

  @Column({ nullable: true, type: 'timestamp', name: 'revoked_at' })
  revokedAt: Date;

  @ManyToOne(() => User, (user) => user.sessions)
  @JoinColumn({ name: 'user_id' })
  user: Relation<User>;

  private isHashed(password: string): boolean {
    // bcrypt hashes start with $2a$, $2b$, or $2y$
    return /^\$2[aby]\$\d+\$/.test(password);
  }
}
