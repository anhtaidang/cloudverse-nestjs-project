import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import PrismaService from '@/prisma.service';
import BlogService from './blog.service';
import BlogResolver from './blog.resolver';

@Module({
  providers: [
    BlogService,
    BlogResolver,
    PrismaService,
    JwtService,
    ConfigService,
  ],
})
export default class BlogModule {}
