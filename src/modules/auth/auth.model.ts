import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '../user/types/user.type';

@ObjectType()
export class RegisterResponse {
  @Field((type) => User)
  user?: User;

  @Field((type) => String)
  role?: String;
}

@ObjectType()
export class LoginResponse {
  @Field(() => User)
  user: User;
  @Field((type) => String)
  role?: String;
}
