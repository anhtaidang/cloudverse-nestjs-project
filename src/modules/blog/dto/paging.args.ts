import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class PaginationArgs {
  @Field(() => Number)
  offset: number = 0;

  @Field(() => Number)
  limit: number = 10;
}
