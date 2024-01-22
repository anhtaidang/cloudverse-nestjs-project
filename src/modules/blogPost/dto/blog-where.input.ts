import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { IsOptional } from 'class-validator';
import { FloatNullableFilter } from '@/util/float-nullable-filter';
import { StringNullableFilter } from '@/util/string-nullable-filter';
import BaseWhereInput from '@/common/dto/base-where.input';

@InputType()
export default class BlogWhereInput extends BaseWhereInput {
  @Type(() => StringNullableFilter)
  @IsOptional()
  @Field(() => StringNullableFilter, {
    nullable: true,
  })
  title?: StringNullableFilter;

  @Type(() => StringNullableFilter)
  @IsOptional()
  @Field(() => StringNullableFilter, {
    nullable: true,
  })
  author?: StringNullableFilter;

  @Type(() => StringNullableFilter)
  @IsOptional()
  @Field(() => StringNullableFilter, {
    nullable: true,
  })
  datePublished?: StringNullableFilter;
}
