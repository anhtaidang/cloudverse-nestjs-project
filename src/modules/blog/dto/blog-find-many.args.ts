import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import BlogWhereInput from './blog-where.input';
import BlogOrderByInput from './blog-order-by.input';

@ArgsType()
export default class BlogFindManyArgs {
  @Field(() => BlogWhereInput, { nullable: true })
  @Type(() => BlogWhereInput)
  where?: BlogWhereInput;

  @Field(() => [BlogOrderByInput], { nullable: true })
  @Type(() => BlogOrderByInput)
  orderBy?: Array<BlogOrderByInput>;

  @Field(() => Number, { nullable: true })
  @Type(() => Number)
  skip?: number;

  @Field(() => Number, { nullable: true, defaultValue: 10 })
  @Type(() => Number)
  take?: number;
}
