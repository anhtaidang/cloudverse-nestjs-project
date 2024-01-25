import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber } from 'class-validator';

@InputType()
export default class BlogWhereUniqueInput {
  @Field(() => Number)
  @IsNotEmpty()
  id!: number;
}
