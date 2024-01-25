import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import PrismaService from '@/prisma.service';
import AuthResolver from './auth.resolver';
import PermissionRoleService from '../permissionRole/permissionRole.service';
import AuthService from './auth.service';
import PrismaSelectService from '@/prismaSelect.service';

@Module({
  providers: [
    AuthResolver,
    AuthService,
    JwtService,
    PrismaService,
    PrismaSelectService,
    PermissionRoleService,
  ],
})
export default class AuthModule {}
