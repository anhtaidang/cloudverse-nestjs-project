import { ArgsType, Field } from '@nestjs/graphql';
import PermissionRoleWhereUniqueInput from './permissionRole-where-unique.input';

@ArgsType()
export default class PermissionRoleFindUniqueArgs {
  @Field(() => PermissionRoleWhereUniqueInput, { nullable: true })
  where!: PermissionRoleWhereUniqueInput;
}
