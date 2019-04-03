import bcrypt from "bcryptjs";
import { Arg, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { User } from "../../entity/User";
import { isAuth } from "../../middleware/isAuth";
import { RegisterInput } from "./register/RegisterInput";
import { Error } from "./shared/Error";

@Resolver()
export class RegisterResolver {
  @UseMiddleware([isAuth])
  @Query(() => String)
  async hello(@Arg("id") id: number) {
    return id;
  }

  @Mutation(() => [Error], { nullable: true })
  async register(@Arg("data")
  {
    fullname,
    username,
    email,
    password
  }: RegisterInput): Promise<Error[] | null> {
    const hashedPassword = await bcrypt.hash(password, 10);

    const emailAlreadyExists = await User.findOne({ where: { email } });

    if (emailAlreadyExists) {
      return [
        {
          path: "email",
          message: "Email already exists"
        }
      ];
    }

    await User.create({
      fullname,
      username,
      email,
      password: hashedPassword
    }).save();

    return null;
  }
}
