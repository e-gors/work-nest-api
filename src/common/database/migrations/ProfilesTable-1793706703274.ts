import type { MigrationInterface, QueryRunner } from 'typeorm';

export class ProfilesTable1793706703274 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // TODO: write migration code here
    await queryRunner.query(`
            CREATE TABLE profiles (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                user_id UUID NOT NULL,
                avatar VARCHAR(255),
                email VARCHAR(255) UNIQUE NOT NULL,
                mobile VARCHAR(20) UNIQUE NOT NULL,
                first_name VARCHAR(100) NOT NULL,
                last_name VARCHAR(100) NOT NULL,
                street VARCHAR(255) NOT NULL,
                brgy VARCHAR(255) NOT NULL,
                city VARCHAR(100) NOT NULL,
                province VARCHAR(100) NOT NULL,
                postal_code VARCHAR(20) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

                CONSTRAINT fk_profiles_user
                FOREIGN KEY (user_id)
                REFERENCES users(id)
                ON DELETE CASCADE
            );
        `);

    // Index for user_id
    await queryRunner.query(`
        CREATE INDEX idx_profiles_user_id ON profiles (user_id);
    `);

    // Search indexes
    await queryRunner.query(`
        CREATE INDEX idx_profiles_first_name
        ON profiles (first_name);
    `);

    await queryRunner.query(`
        CREATE INDEX idx_profiles_last_name
        ON profiles (last_name);
    `);

    // Location filter indexes
    await queryRunner.query(`
        CREATE INDEX idx_profiles_street
        ON profiles (street);
    `);

    await queryRunner.query(`
        CREATE INDEX idx_profiles_brgy
        ON profiles (brgy);
    `);

    await queryRunner.query(`
        CREATE INDEX idx_profiles_city
        ON profiles (city);
    `);

    await queryRunner.query(`
        CREATE INDEX idx_profiles_province
        ON profiles (province);
    `);

    await queryRunner.query(`
        CREATE INDEX idx_profiles_postal_code
        ON profiles (postal_code);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // TODO: write revert code here
    await queryRunner.query(`
            DROP TABLE profiles;
        `);
  }
}
