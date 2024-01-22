import { BaseModel } from '@/common/abstractModel/base.model';
import BaseWhereInput from '@/common/dto/base-where.input';
import { Field, GraphQLISODateTime, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Blog extends BaseModel {
  @Field(() => String, { nullable: true })
  title: string;

  @Field(() => String, { nullable: true })
  author: string;

  @Field(() => String, { nullable: true })
  content: string;

  @Field(() => String, { nullable: true })
  datePublished: string;
}

@ObjectType()
export class BlogResponse {
  @Field(() => Blog, { nullable: true })
  blogPost?: Blog;
}
