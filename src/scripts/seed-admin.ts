import { DataSource } from 'typeorm';
import { dataSourceOptions } from '../config/db.config';
import { User } from '../modules/user/entities/user.entity';
import { Role } from '../common/enums/role.enum';
import * as bcrypt from 'bcryptjs';

/**
 * Standalone seed script to create the first admin user.
 *
 * Usage:
 *   npm run seed:admin
 *
 * Credentials are read from env vars with sensible dev defaults:
 *   ADMIN_EMAIL    (default: admin@guideclasses.com)
 *   ADMIN_PASSWORD (default: Admin@123)
 *
 * This script is idempotent — if an admin with that email already exists,
 * it will skip creation and exit cleanly.
 */
async function seedAdmin() {
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@guideclasses.com';
  const adminPassword = process.env.ADMIN_PASSWORD || 'Admin@123';
  const adminFirstName = process.env.ADMIN_FIRST_NAME || 'Admin';
  const adminLastName = process.env.ADMIN_LAST_NAME || 'User';

  // Create a standalone DataSource (no NestJS app context needed)
  const dataSource = new DataSource({
    ...dataSourceOptions,
    entities: [User],
  });

  try {
    await dataSource.initialize();
    console.log('✅ Database connection established.');

    const userRepo = dataSource.getRepository(User);

    // Check if admin already exists
    const existingAdmin = await userRepo.findOne({
      where: { email: adminEmail },
    });

    if (existingAdmin) {
      console.log(
        `⚠️  Admin user with email "${adminEmail}" already exists. Skipping.`,
      );
      await dataSource.destroy();
      return;
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(adminPassword, salt);

    // Create admin user
    const admin = userRepo.create({
      firstName: adminFirstName,
      lastName: adminLastName,
      email: adminEmail,
      password: hashedPassword,
      role: Role.ADMIN,
      isActive: true,
    });

    await userRepo.save(admin);

    console.log('🎉 Admin user created successfully!');
    console.log(`   Email:    ${adminEmail}`);
    console.log(`   Password: (as provided via env or default)`);
    console.log(`   Role:     ${Role.ADMIN}`);

    await dataSource.destroy();
  } catch (error) {
    console.error('❌ Failed to seed admin user:', error);
    process.exit(1);
  }
}

void seedAdmin();
