import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  dotenv.config();
  console.log('Seeding...');

  await prisma.$connect();

  /*********************************************************************/
  /* Dangerous zone: */
  /* Delete all tables before seeding */
  // Only uncomment these block code below if you want to delete for all existed tables

  await prisma.userRoleMap.deleteMany({});
  await prisma.permissionRole.deleteMany({});
  await prisma.user.deleteMany({});
  await prisma.blog.deleteMany({});

  /*********************************************************************/

  /* Role seeding */
  const permissionRoles = await prisma.permissionRole.createMany({
    data: [
      {
        nameRole: 'Admin',
        canRead: true,
        canWrite: true,
        canUpdate: true,
        canDelete: true,
      },
      {
        nameRole: 'User',
        canRead: true,
        canWrite: false,
        canUpdate: false,
        canDelete: false,
      },
    ],
  });

  /* User seeding */
  const users = await prisma.user.createMany({
    data: [
      {
        username: 'anhtaidang.developer@gmail.com',
        email: 'anhtaidang.developer@gmail.com',
        password: await bcrypt.hash('12345678', 10),
        fullName: 'Đặng Anh Tài',
      },
      {
        username: 'hoai.phuong@gmail.com',
        email: 'hoai.phuong@gmail.com',
        password: await bcrypt.hash('12345678', 10),
        fullName: 'Tăng Hoài Phương',
      },
    ],
  });

  /* User Role map seeding */
  const userRoleMap = await prisma.userRoleMap.createMany({
    data: [
      {
        userId: 1,
        roleId: 1,
      },
      {
        userId: 2,
        roleId: 2,
      },
    ],
  });

  console.log({ users, permissionRoles, userRoleMap });
  console.log('------------------------------------------------');
  console.log('Seeding successfully ...........................');
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
