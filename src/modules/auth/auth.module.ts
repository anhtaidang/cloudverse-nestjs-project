import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import AuthResolver from './auth.resolver';
import AuthService from './auth.service';
import PrismaModule from '@/prisma.module';
import PermissionRoleModule from '../permissionRole/permissionRole.module';

@Module({
  imports: [PrismaModule, PermissionRoleModule],
  providers: [AuthResolver, AuthService, JwtService],
  exports: [AuthService],
})
export default class AuthModule {}
