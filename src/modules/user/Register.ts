import bcrypt from "bcryptjs";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { User } from "../../entity/User";

@Resolver()
export class RegisterResolver {
  @Query(() => String, { name: "helloWorld" })
  async hello() {
    // return "hello";
    return null;
  }

  @Mutation(() => User)
  async register(
    @Arg("fistName") firstName: string,
    @Arg("lastName") lastName: string,
    @Arg("email") email: string,
    @Arg("password") password: string
  ): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword
    }).save();

    return user;
  }
}
