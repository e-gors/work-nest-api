import { Column, Entity, OneToOne, PrimaryColumn } from 'typeorm';
import { WorkerAvailabilityStatus } from '../../common/constants.js';
import { IsEnum } from 'class-validator';
import { Profile } from '../../profiles/entities/profile.entity.js';
import type { Relation } from 'typeorm';
@Entity({ name: 'worker_profiles' })
export class WorkerProfile {
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  @Column({ type: 'uuid', name: 'profile_id' })
  profileID: string;

  @Column({ type: 'text' })
  bio: string;

  @Column({ type: 'integer', name: 'experience_years' })
  experienceYears: number;

  @Column({ type: 'integer', name: 'service_radius_km' })
  serviceRadiusKm: number;

  @Column({
    type: 'varchar',
    length: 255,
    name: 'availability_status',
    default: WorkerAvailabilityStatus.AVAILABLE,
  })
  @IsEnum(WorkerAvailabilityStatus)
  availabilityStatus: string;

  @Column({
    type: 'timestamp',
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column({ type: 'timestamp', name: 'updated_at', nullable: true })
  updatedAt: Date;

  @OneToOne(() => Profile, (profile) => profile.workerProfile, {
    onDelete: 'CASCADE',
  })
  profile: Relation<Profile>;
}
