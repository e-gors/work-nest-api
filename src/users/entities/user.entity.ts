import bcrypt from 'bcryptjs';
import { IsEmail, IsEnum } from 'class-validator';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import type { Relation } from 'typeorm';
import { UserRoles, UserStatus } from '../../common/constants.js';
import { Profile } from '../../profiles/entities/profile.entity.js';
import { UserSession } from '../../user_sessions/entities/user_session.entity.js';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, type: 'varchar', length: 255 })
  @IsEmail()
  email: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @BeforeInsert()
  async hashPasswordBeforeInsert(): Promise<void> {
    if (!this.password.startsWith('$2')) {
      // basic check
      this.password = await bcrypt.hash(this.password, 10);
    }
  }

  @BeforeUpdate()
  async hashPasswordBeforeUpdate(): Promise<void> {
    // Only hash if password field changed
    if (this.password && !this.password.startsWith('$2')) {
      this.password = await bcrypt.hash(this.password, 10);
    }
  }

  @Column({ default: 'customer', type: 'varchar', length: 255 })
  @IsEnum(UserRoles)
  role: string;

  @Column({ unique: true, type: 'varchar', length: 255 })
  mobile: string;

  @Column({ default: 'pending', type: 'varchar', length: 255 })
  @IsEnum(UserStatus)
  status: string;

  @Column({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column({
    name: 'updated_at',
    type: 'timestamp',
  })
  updatedAt: Date;

  @Column({
    nullable: true,
    type: 'varchar',
    length: 255,
    name: 'email_verified_at',
  })
  emailVerifiedAt: string;

  @OneToOne(() => Profile, (profile) => profile.user)
  profile: Relation<Profile>;

  @OneToMany(() => UserSession, (session) => session.user)
  sessions: Relation<UserSession[]>;

  async comparePassword(plainPassword: string): Promise<boolean> {
    return bcrypt.compare(plainPassword, this.password);
  }
}
