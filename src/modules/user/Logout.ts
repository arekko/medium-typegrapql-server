import { MyContext } from "src/types/MyContext";
import { Ctx, Mutation, Query, Resolver } from "type-graphql";

@Resolver()
export class LogoutResolver {
  @Query(() => String)
  async hello() {
    return "hello";
  }

  @Mutation(() => Boolean)
  async logout(@Ctx() ctx: MyContext): Promise<Boolean> {
    return new Promise((res, rej) =>
      ctx.req.session!.destroy(err => {
        if (err) {
          console.log(err);
          rej(false);
        }

        ctx.res.clearCookie("qid");
        res(true);
      })
    );
  }
}
