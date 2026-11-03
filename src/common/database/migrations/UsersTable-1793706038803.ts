import type { MigrationInterface, QueryRunner } from 'typeorm';

export class UsersTable1793706038803 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // TODO: write migration code here
    await queryRunner.query(`
        CREATE TABLE users (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            role VARCHAR(50) DEFAULT 'customer',
            mobile VARCHAR(20) UNIQUE NOT NULL,
            status VARCHAR(50) DEFAULT 'pending',
            email_verified_at TIMESTAMP,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `);

    // Index for role
    await queryRunner.query(`
        CREATE INDEX idx_users_role ON users (role);
    `);

    // Index for filters
    // Index for status
    await queryRunner.query(`
        CREATE INDEX idx_users_status ON users (status);
    `);

    // Index for email_verified_at
    await queryRunner.query(`
        CREATE INDEX idx_users_email_verified_at ON users (email_verified_at);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // TODO: write revert code here
    await queryRunner.query(`
        DROP TABLE users;
    `);
  }
}
