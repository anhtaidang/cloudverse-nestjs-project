import {
  HttpException,
  HttpStatus,
  Logger,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { Args, Mutation, Resolver, Query, Info } from '@nestjs/graphql';
import BlogService from './blog.service';
import {
  BlogCreateInput,
  BlogUpdateInput,
  BlogWhereInput,
  BlogWhereUniqueInput,
} from './dto';
import { GraphQLErrorFilter } from '@/filters/custom-exception';
import { Blog } from './blog.model';
import AdminAuthGuard from '@/guards/adminAuth.guard';
import UserAuthGuard from '@/guards/userAuth.guard';
import { GraphQLResolveInfo } from 'graphql';

@UseFilters(GraphQLErrorFilter)
@Resolver((of) => Blog)
export default class BlogResolver {
  private readonly logger = new Logger(BlogResolver.name);
  constructor(private readonly blogService: BlogService) {}

  @UseGuards(AdminAuthGuard) // User with role admin can access this query
  @Mutation(() => Blog)
  public async createBlog(@Args('data') data: BlogCreateInput): Promise<Blog> {
    try {
      return await this.blogService.create({ data });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @UseGuards(AdminAuthGuard) // User with role admin can access this query
  @Mutation(() => Blog)
  public async updateBlog(
    @Args('data') data: BlogUpdateInput,
    @Args('where') where: BlogWhereUniqueInput,
  ): Promise<Blog> {
    try {
      return await this.blogService.update({
        where,
        data: {
          ...data,
          updatedAt: new Date(),
        },
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @UseGuards(UserAuthGuard)
  @Query(() => Blog)
  public async blog(
    @Args('where') where: BlogWhereUniqueInput,
    @Info() info?: GraphQLResolveInfo,
  ): Promise<Blog | null> {
    try {
      this.logger.log(`Getting one blog`);
      return this.blogService.findOne({ where }, info);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @UseGuards(UserAuthGuard)
  @Query(() => [Blog])
  public async blogs(
    @Args('where') where: BlogWhereInput,
    @Args('skip', { nullable: true }) skip?: number,
    @Args('take', { nullable: true }) take?: number,
  ): Promise<Blog[]> {
    try {
      this.logger.log(`Getting a list of blogs`);
      return this.blogService.findMany({ where, skip, take });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @UseGuards(AdminAuthGuard) // User with role admin can access this query
  @Mutation(() => Blog)
  public async deleteBlog(
    @Args('where') where: BlogWhereUniqueInput,
  ): Promise<Blog> {
    try {
      this.logger.log(`Deleting a blog`);
      return await this.blogService.delete({ where });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
