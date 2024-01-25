import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

@InputType()
export default class PermissionRoleUpdateInput {
  @Field(() => String, { nullable: true })
  nameRole?: string;

  @Field()
  @IsNotEmpty({ message: 'canRead is required.' })
  canRead: boolean;

  @Field()
  @IsNotEmpty({ message: 'canWrite is required.' })
  canWrite: boolean;

  @Field()
  @IsNotEmpty({ message: 'canUpdate is required.' })
  canUpdate: boolean;

  @Field()
  @IsNotEmpty({ message: 'canDelete is required.' })
  canDelete: boolean;
}
