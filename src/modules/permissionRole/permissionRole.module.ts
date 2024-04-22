import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import PermissionRoleService from './permissionRole.service';
import PermissionRoleResolver from './permissionRole.resolver';
import PrismaModule from '@/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [
    PermissionRoleResolver,
    PermissionRoleService,
    JwtService,
    ConfigService,
  ],
  exports: [PermissionRoleService],
})
export default class PermissionRoleModule {}
