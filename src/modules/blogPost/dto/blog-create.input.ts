import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export default class BlogCreateInput {
  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  title: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  author: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  datePublished: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  content: string;
}

