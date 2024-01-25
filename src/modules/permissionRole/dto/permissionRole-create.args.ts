import { ArgsType, Field, InputType } from '@nestjs/graphql';
import PermissionRoleCreateInput from './permissionRole-create.input';

@InputType()
export default class PermissionRoleCreateArgs {
  @Field(() => PermissionRoleCreateInput, { nullable: false })
  data!: PermissionRoleCreateInput;
}
