import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import PrismaService from '@/prisma.service';
import PermissionRoleService from './permissionRole.service';
import PermissionRoleResolver from './permissionRole.resolver';
import PrismaSelectService from '@/prismaSelect.service';

@Module({
  providers: [
    PermissionRoleResolver,
    PermissionRoleService,
    JwtService,
    PrismaService,
    PrismaSelectService,
    ConfigService,
  ],
})
export default class PermissionRoleModule {}
