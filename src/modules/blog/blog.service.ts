import PrismaService from '@/prisma.service';
import PrismaSelectService from '@/prismaSelect.service';
import { Injectable } from '@nestjs/common';
import { Blog, Prisma } from '@prisma/client';
import { GraphQLResolveInfo } from 'graphql';

@Injectable()
export default class BlogService {
  constructor(
    private prisma: PrismaService,
    private readonly prismaSelectService: PrismaSelectService,
  ) {}

  public async create<T extends Prisma.BlogCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.BlogCreateArgs>,
  ): Promise<Blog> {
    return this.prisma.blog.create(args);
  }

  public async findMany<T extends Prisma.BlogFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.BlogFindManyArgs>,
  ): Promise<Blog[]> {
    return this.prisma.blog.findMany(args);
  }

  public async update<T extends Prisma.BlogUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.BlogUpdateArgs>,
  ): Promise<Blog> {
    return this.prisma.blog.update(args);
  }

  public async findOne<T extends Prisma.BlogFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.BlogFindUniqueArgs>,
    info?: GraphQLResolveInfo,
  ): Promise<Blog> {
    const select = this.prismaSelectService.getValue(info);
    return this.prisma.blog.findUnique({ ...select, ...args });
  }

  public async delete<T extends Prisma.BlogFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.BlogFindUniqueArgs>,
  ) {
    return this.prisma.blog.delete(args);
  }
}
