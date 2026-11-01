import { DataSource } from 'typeorm';

export async function seedRoles(dataSource: DataSource) {
  const roleRepository = dataSource.getRepository('Role');

  const roles = [
    { name: 'super_admin' },
    { name: 'admin' },
    { name: 'manager' },
    { name: 'worker' },
    { name: 'customer' },
    { name: 'guest' },
  ];

  for (const role of roles) {
    const existingRole = await roleRepository.findOne({
      where: { name: role.name },
    });
    if (!existingRole) {
      await roleRepository.save(role);
      console.log(`Role '${role.name}' has been seeded.`);
    } else {
      console.log(`Role '${role.name}' already exists. Skipping seeding.`);
    }
  }
}
