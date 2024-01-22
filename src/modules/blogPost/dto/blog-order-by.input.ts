import { InputType, Field } from '@nestjs/graphql';
import { SortOrder } from '@/util/sort-order';

@InputType({
  isAbstract: true,
  description: undefined,
})
export default class BlogOrderByInput {
  @Field(() => SortOrder, {
    nullable: true,
  })
  id?: SortOrder;

  @Field(() => SortOrder, {
    nullable: true,
  })
  title?: SortOrder;

  @Field(() => SortOrder, {
    nullable: true,
  })
  author?: SortOrder;

  @Field(() => SortOrder, {
    nullable: true,
  })
  datePublished?: SortOrder;

  @Field(() => SortOrder, {
    nullable: true,
  })
  createdAt?: SortOrder;

  @Field(() => SortOrder, {
    nullable: true,
  })
  updatedAt?: SortOrder;
}
