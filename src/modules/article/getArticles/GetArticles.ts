import {
  Arg,
  FieldResolver,
  Query,
  Resolver,
  Root,
  UseMiddleware
} from "type-graphql";
import { getConnection } from "typeorm";
import { Article } from "../../../entity/Article";
import { User } from "../../../entity/User";
import { isAuth } from "../../../middleware/isAuth";

@Resolver(() => Article)
export class GetArticles {
  @FieldResolver()
  async owner(@Root() article: Article) {
    return await User.findOne(article.user_id);
  }

  @UseMiddleware([isAuth])
  @Query(() => [Article])
  async getArticles(
    @Arg("limit") limit: number,
    @Arg("offset") offset: number
  ): Promise<Article[] | null> {
    let articlesQB = getConnection()
      .getRepository(Article)
      .createQueryBuilder("l")
      .take(limit)
      .skip(offset)
      .getMany();

    return articlesQB;
  }
}
