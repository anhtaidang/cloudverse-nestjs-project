import { ArgsType, Field } from '@nestjs/graphql';
import BlogWhereUniqueInput from './blog-where-unique.input';

@ArgsType()
export default class BlogFindUniqueArgs {
  @Field(() => BlogWhereUniqueInput, { nullable: true })
  where!: BlogWhereUniqueInput;
}
