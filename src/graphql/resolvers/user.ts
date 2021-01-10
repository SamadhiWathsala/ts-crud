import { Query, Mutation, Resolver, Arg, InputType, Field } from "type-graphql";

import Users, { User } from "../../model/user";

@InputType()
class NewUserInput implements Partial<User> {
  @Field()
  userName!: string;

  @Field()
  userAddress!: string;

  @Field()
  password!: string;

  @Field()
  mobileNo!: string;
}

@Resolver()
export class UserResolver {
  @Query(() => [User])
  async users(): Promise<User[]> {
    const users = await Users.find();
    return users;
  }

  @Query(() => User, { nullable: true })
  async userByID(@Arg("id") id: String): Promise<User | null> {
    const user = await Users.findById(id);
    return user;
  }

  @Mutation(() => User)
  async register(@Arg("inputs") inputs: NewUserInput): Promise<User> {
    let newUser = await Users.create(inputs);
    return newUser;
  }
}
