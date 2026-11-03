import type { MigrationInterface, QueryRunner } from 'typeorm';

export class UserSessionsTable1793714491110 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // TODO: write migration code here
    await queryRunner.query(`
            CREATE TABLE "user_sessions" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "user_id" uuid NOT NULL,
                "refresh_token" text NOT NULL,
                "user_agent" text,
                "ip_address" text,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "expires_at" TIMESTAMP NOT NULL,
                "revoked_at" TIMESTAMP,
                CONSTRAINT "PK_user_sessions_id" PRIMARY KEY ("id"),
                CONSTRAINT "FK_user_sessions_user_id" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE
            );
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // TODO: write revert code here
    await queryRunner.query(`
            DROP TABLE "user_sessions";
        `);
  }
}
