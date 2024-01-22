import { DateTimeNullableFilter } from '@/util/datetime-nullable-filter';
import { FloatNullableFilter } from '@/util/float-nullable-filter';
import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { IsOptional } from 'class-validator';

@InputType()
export default class BaseWhereInput {
  @Type(() => FloatNullableFilter)
  @IsOptional()
  @Field(() => FloatNullableFilter, {
    nullable: true,
  })
  id?: number;

  @Field(() => Number, { nullable: true })
  createdBy?: number;

  @Field(() => Number, { nullable: true })
  updatedBy?: number;

  @Type(() => DateTimeNullableFilter)
  @IsOptional()
  @Field(() => DateTimeNullableFilter, {
    nullable: true,
  })
  createdAt?: DateTimeNullableFilter;

  @Type(() => DateTimeNullableFilter)
  @IsOptional()
  @Field(() => DateTimeNullableFilter, {
    nullable: true,
  })
  updatedAt?: DateTimeNullableFilter;
}
