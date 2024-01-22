import { Field, InputType } from '@nestjs/graphql';

@InputType()
export default class BlogWhereUniqueInput {
  @Field(() => Number)
  id!: number;
}
