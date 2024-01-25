import { Field, GraphQLISODateTime, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Blog {
  @Field(() => Number)
  public id: number;

  @Field(() => String, { nullable: true })
  title: string;

  @Field(() => String, { nullable: true })
  author: string;

  @Field(() => String, { nullable: true })
  content: string;

  @Field(() => String, { nullable: true })
  datePublished: string;

  @Field(() => Number, { nullable: true })
  createdBy?: number;

  @Field(() => Number, { nullable: true })
  updatedBy?: number;

  @Field(() => GraphQLISODateTime)
  createdAt: Date;

  @Field(() => GraphQLISODateTime)
  updatedAt: Date;
}

@ObjectType()
export class BlogResponse {
  @Field(() => Blog, { nullable: true })
  blogPost?: Blog;
}
