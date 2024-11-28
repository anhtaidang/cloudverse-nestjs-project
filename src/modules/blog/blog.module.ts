import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import TokenService from '@/services/token/token.service';
import BlogService from './blog.service';
import BlogResolver from './blog.resolver';
import PrismaModule from '@/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [
    BlogService,
    BlogResolver,
    TokenService,
    JwtService,
    ConfigService,
  ],
  exports: [BlogService],
})
export default class BlogModule {}
