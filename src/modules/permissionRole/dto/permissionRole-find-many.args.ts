import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import PermissionRoleWhereInput from './permissionRole-where.input';
import PermissionRoleOrderByInput from './permissionRole-order-by.input';

@ArgsType()
export default class PermissionRoleFindManyArgs {
  @Field(() => PermissionRoleWhereInput, { nullable: true })
  @Type(() => PermissionRoleWhereInput)
  where?: PermissionRoleWhereInput;

  @Field(() => [PermissionRoleOrderByInput], { nullable: true })
  @Type(() => PermissionRoleOrderByInput)
  orderBy?: Array<PermissionRoleOrderByInput>;

  @Field(() => Number, { nullable: true })
  @Type(() => Number)
  skip?: number;

  @Field(() => Number, { nullable: true, defaultValue: 10 })
  @Type(() => Number)
  take?: number;
}
