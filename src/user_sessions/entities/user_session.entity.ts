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
import { User } from '../../users/entities/user.entity.js';

@Entity('user_sessions')
export class UserSession {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  user_id: string;

  @Column()
  refresh_token: string;

  @BeforeInsert()
  async hashrefresh_tokenBeforeInsert(): Promise<void> {
    this.refresh_token = await bcrypt.hash(this.refresh_token, 10);
  }

  @BeforeUpdate()
  async hashrefresh_tokenBeforeUpdate(): Promise<void> {
    if (this.refresh_token && !this.isHashed(this.refresh_token)) {
      this.refresh_token = await bcrypt.hash(this.refresh_token, 10);
    }
  }

  @Column({ nullable: true })
  user_agent: string;

  @Column({ nullable: true })
  ip_address: string;

  @CreateDateColumn()
  created_at: Date;

  @Column()
  expires_at: Date;

  @Column({ nullable: true })
  revoked_at: Date;

  @ManyToOne(() => User, (user) => user.sessions)
  @JoinColumn({ name: 'user_id' })
  user: User;

  private isHashed(password: string): boolean {
    // bcrypt hashes start with $2a$, $2b$, or $2y$
    return /^\$2[aby]\$\d+\$/.test(password);
  }
}
