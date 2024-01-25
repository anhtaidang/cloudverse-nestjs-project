import { ArgsType, Field, InputType } from '@nestjs/graphql';
import BlogCreateInput from './blog-create.input';

@ArgsType()
export default class BlogCreateArgs {
  @Field(() => BlogCreateInput, { nullable: false })
  data!: BlogCreateInput;
}
