import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import AuthResolver from './auth.resolver';
import PermissionRoleService from '../permissionRole/permissionRole.service';
import AuthService from './auth.service';
import { PrismaModule } from '@/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [
    // PrismaService,
    // PrismaSelectService,
    AuthResolver,
    AuthService,
    JwtService,
    PermissionRoleService,
  ],
})
export default class AuthModule {}
