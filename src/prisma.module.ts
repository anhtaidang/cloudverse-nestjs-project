import { Module } from '@nestjs/common';
import PrismaService from './prisma.service';
import PrismaSelectService from './prismaSelect.service';

@Module({
  providers: [PrismaService, PrismaSelectService],
  exports: [PrismaService, PrismaSelectService],
})
export default class PrismaModule {}
