import bcrypt from "bcryptjs";
import { MyContext } from "src/types/MyContext";
import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import { User } from "../../entity/User";
import { invalidLogin } from "./login/ErrorMessages";
import { Error } from "./shared/Error";

@Resolver()
export class LoginResolver {
  @Mutation(() => [Error], { nullable: true })
  async login(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() ctx: MyContext
  ): Promise<Error[] | null> {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return [
        {
          path: "email",
          message: invalidLogin
        }
      ];
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      return [
        {
          path: "password",
          message: "incorrect password"
        }
      ];
    }

    ctx.req.session!.userId = user.id;

    return null;
  }
}
