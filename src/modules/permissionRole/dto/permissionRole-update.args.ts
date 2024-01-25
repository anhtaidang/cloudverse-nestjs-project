import { ArgsType, Field } from '@nestjs/graphql';
import PermissionRoleUpdateInput from './permissionRole-update.input';
import PermissionRoleWhereUniqueInput from './permissionRole-where-unique.input';

@ArgsType()
export default class PermissionRoleUpdateArgs {
  @Field(() => PermissionRoleWhereUniqueInput, { nullable: false })
  where!: PermissionRoleWhereUniqueInput;

  @Field(() => PermissionRoleUpdateInput, { nullable: false })
  data!: PermissionRoleUpdateInput;
}
