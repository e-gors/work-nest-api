import { DataSource } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { User } from '../../../users/entities/user.entity.js';
import { Profile } from '../../../profiles/entities/profile.entity.js';
import { UserRoles } from '../../constants.js';

export async function seedSuperAdmin(dataSource: DataSource) {
  const userRepo = dataSource.getRepository(User);
  const profileRepo = dataSource.getRepository(Profile);

  // Check if super admin exists
  let superAdmin = await userRepo.findOne({
    where: { role: UserRoles.SUPER_ADMIN },
  });

  if (!superAdmin) {
    const passwordHash = await bcrypt.hash(
      process.env.SUPER_ADMIN_PASSWORD || 'supersecret',
      10,
    );

    // Create super admin user
    superAdmin = await userRepo.save(
      userRepo.create({
        email: process.env.SUPER_ADMIN_EMAIL || 'superadmin@worknest.com',
        password: passwordHash,
        mobile: '+639361416119',
        role: UserRoles.SUPER_ADMIN,
        status: 'active',
        emailVerifiedAt: new Date().toISOString(),
        createdAt: new Date().toISOString(),
      }),
    );

    console.log('🌟 Super admin user created!');
  } else {
    console.log('🌟 Super admin user already exists.');
  }

  // Check if profile exists
  const existingProfile = await profileRepo.findOne({
    where: { userId: superAdmin.id },
  });

  if (!existingProfile) {
    // Create a default profile for super admin
    await profileRepo.save(
      profileRepo.create({
        userId: superAdmin.id,
        firstName: 'Super',
        lastName: 'Admin',
        email: superAdmin.email,
        mobile: '+639123456789',
        avatar: '', // leave blank or default image URL
        street: 'Street 1234',
        brgy: 'Brgy ABCD',
        city: 'Hilongos',
        province: 'Leyte',
        postalCode: '6524',
        createdAt: new Date().toISOString(),
      }),
    );

    console.log('🌟 Super admin profile created!');
  } else {
    console.log('🌟 Super admin profile already exists.');
  }
}
