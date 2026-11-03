import fs from 'fs';
import path from 'path';

const args = process.argv.slice(2);

if (!args[0]) {
  console.error('Please provide a migration name.');
  process.exit(1);
}

const tableName = args[0];
const timestamp = Date.now();

// Directory for migrations
const migrationsDir = path.join(
  process.cwd(),
  'src/common/database/migrations',
);
if (!fs.existsSync(migrationsDir)) {
  fs.mkdirSync(migrationsDir, { recursive: true });
}

// Filename: TableName-Timestamp.ts
const fileName = `${tableName}-${timestamp}.ts`;
const filePath = path.join(migrationsDir, fileName);

// Class name: TableNameTimestamp
const className = `${tableName}${timestamp}`;

// Boilerplate content
const template = `import type { MigrationInterface, QueryRunner } from "typeorm";

export class ${className} implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // TODO: write migration code here
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // TODO: write revert code here
    }

}
`;

// Write file
fs.writeFileSync(filePath, template);

console.log(`Migration created: ${filePath}`);
console.log(`Class name: ${className}`);
