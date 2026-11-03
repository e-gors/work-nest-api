import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

dotenv.config();

const currentDirectory = path.dirname(fileURLToPath(import.meta.url));

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT || 5432),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,

  entities: [path.join(currentDirectory, '../../**/*.entity{.ts,.js}')],

  migrations: [path.join(currentDirectory, 'migrations/*{.ts,.js}')],

  synchronize: false,
});
