import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import PrismaService from '@/prisma.service';
import TokenService from '@/token/token.service';
import PrismaSelectService from '@/prismaSelect.service';
import BlogService from './blog.service';
import BlogResolver from './blog.resolver';

@Module({
  providers: [
    BlogService,
    BlogResolver,
    PrismaService,
    PrismaSelectService,
    TokenService,
    JwtService,
    ConfigService,
  ],
})
export default class BlogModule {}
