import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import type { Relation } from 'typeorm';
import { IsEmail } from 'class-validator';
import { User } from '../../users/entities/user.entity.js';
import { WorkerProfile } from '../../worker_profiles/entities/worker_profile.entity.js';

@Entity('profiles')
export class Profile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', name: 'user_id' })
  userId: string;

  @Column({ nullable: true, type: 'text' })
  avatar?: string;

  @Column({ unique: true, type: 'varchar', length: 255 })
  @IsEmail()
  email: string;

  @Column({ unique: true, type: 'varchar', length: 255 })
  mobile: string;

  @Column({ name: 'first_name', type: 'varchar', length: 255 })
  firstName: string;

  @Column({ name: 'last_name', type: 'varchar', length: 255 })
  lastName: string;

  @Column({ type: 'varchar', length: 255 })
  street: string;

  @Column({ type: 'varchar', length: 255 })
  brgy: string;

  @Column({ type: 'varchar', length: 255 })
  city: string;

  @Column({ type: 'varchar', length: 255 })
  province: string;

  @Column({ name: 'postal_code', type: 'varchar', length: 255 })
  postalCode: string;

  @Column({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column({
    nullable: true,
    type: 'timestamp',
    name: 'updated_at',
  })
  updatedAt: Date;

  @OneToOne(() => User, (user) => user.profile, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: Relation<User>;

  @OneToOne(() => WorkerProfile, (workerProfile) => workerProfile.profile)
  workerProfile: Relation<WorkerProfile>;
}
