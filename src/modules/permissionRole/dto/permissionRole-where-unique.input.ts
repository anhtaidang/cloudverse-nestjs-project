import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber } from 'class-validator';

@InputType()
export default class PermissionRoleWhereUniqueInput {
  @Field(() => Number)
  @IsNotEmpty()
  id!: number;
}
