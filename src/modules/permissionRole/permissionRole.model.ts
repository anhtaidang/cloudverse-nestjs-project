import { Field, GraphQLISODateTime, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PermissionRole {
  @Field(() => Number)
  public id: number;

  @Field(() => String, { nullable: true })
  nameRole: string;

  @Field(() => Boolean, { nullable: true })
  canRead: Boolean;

  @Field(() => Boolean, { nullable: true })
  canWrite: Boolean;

  @Field(() => Boolean, { nullable: true })
  canDelete: Boolean;

  @Field(() => Boolean, { nullable: true })
  canUpdate: Boolean;

  @Field(() => GraphQLISODateTime)
  createdAt: Date;

  @Field(() => GraphQLISODateTime)
  updatedAt: Date;
}

@ObjectType()
export class PermissionRoleResponse {
  @Field(() => PermissionRole, { nullable: true })
  permissionRoles?: PermissionRole;
}
