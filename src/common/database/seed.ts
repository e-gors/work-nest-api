import 'reflect-metadata';
import { AppDataSource } from './data-source.js';
import { seedRoles } from './seeds/roles.seed.js';

async function runSeeds() {
  await AppDataSource.initialize();
  console.log('Seeding database...');

  // Add here calls to your seed functions for other entities as needed
  await seedRoles(AppDataSource);

  await AppDataSource.destroy();
  console.log('Database seeding complete');
}

runSeeds().catch((err) => {
  console.error('Seeding failed', err);
  process.exit(1);
});
