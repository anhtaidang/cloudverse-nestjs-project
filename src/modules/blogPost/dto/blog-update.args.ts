import { ArgsType, Field } from '@nestjs/graphql';
import BlogUpdateInput from './blog-update.input';
import BlogWhereUniqueInput from './blog-where-unique.input';

@ArgsType()
export default class BlogUpdateArgs {
  @Field(() => BlogWhereUniqueInput, { nullable: false })
  where!: BlogWhereUniqueInput;

  @Field(() => BlogUpdateInput, { nullable: false })
  data!: BlogUpdateInput;
}
