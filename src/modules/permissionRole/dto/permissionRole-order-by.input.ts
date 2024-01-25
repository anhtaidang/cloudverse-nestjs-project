import { InputType, Field } from '@nestjs/graphql';
import { SortOrder } from '@/util/sort-order';

@InputType({
  isAbstract: true,
  description: undefined,
})
export default class PermissionRoleOrderByInput {
  @Field(() => SortOrder, {
    nullable: true,
  })
  id?: SortOrder;

  @Field(() => SortOrder, {
    nullable: true,
  })
  nameRole?: SortOrder;
}
