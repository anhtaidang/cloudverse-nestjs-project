import PrismaService from '@/prisma.service';
import { Blog, Prisma } from '@prisma/client';

export default class BlogService {
  constructor(private prisma: PrismaService) {}

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
  ): Promise<Blog> {
    return this.prisma.blog.findUnique(args);
  }
}
