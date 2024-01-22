import { Logger, UseFilters } from '@nestjs/common';
import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import BlogService from './blog.service';
import {
  BlogCreateArgs,
  BlogFindManyArgs,
  BlogFindUniqueArgs,
  BlogUpdateArgs,
} from './dto';
import { GraphQLErrorFilter } from '@/filters/custom-exception';
import { Blog } from './blog.model';

@Resolver()
export default class BlogResolver {
  private readonly logger = new Logger(BlogResolver.name);
  constructor(private readonly blogService: BlogService) {}

  @UseFilters(GraphQLErrorFilter)
  @Mutation(() => Blog)
  public async createBlog(@Args() args: BlogCreateArgs): Promise<Blog> {
    this.logger.log(`Creating a blog`);
    return await this.blogService.create(args);
  }

  @UseFilters(GraphQLErrorFilter)
  @Mutation(() => Blog)
  public async updateBlog(@Args() args: BlogUpdateArgs): Promise<Blog> {
    this.logger.log(`Updating a movie`);
    return await this.blogService.update(args);
  }

  @UseFilters(GraphQLErrorFilter)
  @Query(() => Blog)
  public async blog(@Args() args: BlogFindUniqueArgs): Promise<Blog> {
    this.logger.log(`Getting one blog`);
    return this.blogService.findOne(args);
  }

  @UseFilters(GraphQLErrorFilter)
  @Query(() => [Blog])
  public async blogs(@Args() args: BlogFindManyArgs): Promise<Blog[]> {
    this.logger.log(`Getting a list of movies`);
    return this.blogService.findMany(args);
  }
}
