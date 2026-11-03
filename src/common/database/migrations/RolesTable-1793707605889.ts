import type { MigrationInterface, QueryRunner } from 'typeorm';

export class RolesTable1793707605889 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // TODO: write migration code here
    await queryRunner.query(`
            CREATE TABLE roles (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                name VARCHAR(50) UNIQUE NOT NULL,
                description VARCHAR(255),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // TODO: write revert code here
    await queryRunner.query(`
            DROP TABLE roles;
        `);
  }
}
