import {
  Arg,
  FieldResolver,
  Query,
  Resolver,
  Root,
  UseMiddleware
} from "type-graphql";
import { Article } from "../../../entity/Article";
import { User } from "../../../entity/User";
import { isAuth } from "../../../middleware/isAuth";

@Resolver(() => Article)
export class GetArticleResolver {
  @FieldResolver()
  async owner(@Root() article: Article) {
    return await User.findOne(article.user_id);
  }

  @UseMiddleware([isAuth])
  @Query(() => Article, { nullable: true })
  async getArticle(@Arg("id") id: number): Promise<Article | null> {
    const article = await Article.findOne({ where: { id } });

    return article ? article : null;
  }
}
