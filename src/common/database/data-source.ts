import { DataSource } from "typeorm";
import * as dotenv from "dotenv";

dotenv.config(); // load .env

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "5432", 10),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [], // add all your entities here
  migrations: [
    // Use glob pattern relative to src folder
    __dirname + "/migrations/*{.ts,.js}",
  ],
  synchronize: false, // never true in production
});
