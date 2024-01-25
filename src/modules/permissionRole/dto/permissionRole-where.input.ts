import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { IsOptional } from 'class-validator';
import { StringNullableFilter } from '@/util/string-nullable-filter';
import { FloatNullableFilter } from '@/util/float-nullable-filter';
import { BooleanFilter } from '@/util/boolean-filter';

@InputType()
export default class PermissionRoleWhereInput {
  @Type(() => FloatNullableFilter)
  @IsOptional()
  @Field(() => FloatNullableFilter, {
    nullable: true,
  })
  id?: number;

  @Type(() => StringNullableFilter)
  @IsOptional()
  @Field(() => StringNullableFilter, {
    nullable: true,
  })
  nameRole?: StringNullableFilter;

  @Type()
  @IsOptional()
  @Field(() => BooleanFilter, {
    nullable: true,
  })
  canRead?: BooleanFilter;

  @Type()
  @IsOptional()
  @Field(() => BooleanFilter, {
    nullable: true,
  })
  canWrite?: BooleanFilter;
  @Type()
  @IsOptional()
  @Field(() => BooleanFilter, {
    nullable: true,
  })
  canDelete?: BooleanFilter;

  @Type()
  @IsOptional()
  @Field(() => BooleanFilter, {
    nullable: true,
  })
  canUpdate?: BooleanFilter;
}
