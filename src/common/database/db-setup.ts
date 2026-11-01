import "reflect-metadata";
import { AppDataSource } from "./data-source.js";

async function main() {
  const env = process.env.NODE_ENV || "development";
  console.log(`Running DB setup for environment: ${env}`);

  await AppDataSource.initialize();

  try {
    // Always run pending migrations
    console.log("Running migrations...");
    await AppDataSource.runMigrations();

    console.log("DB setup complete!");
  } catch (err) {
    console.error("DB setup failed", err);
    process.exit(1);
  } finally {
    await AppDataSource.destroy();
  }
}

main();
