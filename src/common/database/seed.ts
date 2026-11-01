import "reflect-metadata";
import { AppDataSource } from "./data-source.js";

async function runSeeds() {
  await AppDataSource.initialize();
  console.log("Seeding database...");

  // seeding projects

  await AppDataSource.destroy();
  console.log("Database seeding complete");
}

runSeeds().catch((err) => {
  console.error("Seeding failed", err);
  process.exit(1);
});
