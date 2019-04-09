import {
  Arg,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root
} from "type-graphql";
import { Article } from "../../entity/Article";
import { Bookmark } from "../../entity/Bookmark";
import { User } from "../../entity/User";
import { Error } from "./shared/Error";

@Resolver(() => Bookmark)
export class BookmarkResolver {
  @FieldResolver()
  async bmarticle(@Root() bookmark: Bookmark) {
    return await Article.findOne(bookmark.article_id);
  }

  @Mutation(() => [Error], { nullable: true })
  async addBookmark(
    @Arg("articleId") articleId: number,
    @Arg("userId") userId: number
  ): Promise<Error[] | null> {
    const user = await User.findOne({ where: { userId } });
    const article = await Article.findOne({ where: { articleId } });

    if (!user) {
      return [
        {
          path: "bookmark",
          message: "user not exists"
        }
      ];
    }

    if (!article) {
      return [
        {
          path: "bookmark",
          message: "article not exists"
        }
      ];
    }

    console.log(userId, articleId);

    await Bookmark.create({
      user_id: userId,
      article_id: articleId
    }).save();

    return null;
  }

  @Query(() => [Bookmark], { nullable: true })
  async getBookmarks(
    @Arg("userId") userId: number
  ): Promise<Bookmark[] | null> {
    const bookmarks = await Bookmark.find({ where: { user_id: userId } });

    return bookmarks;
  }
}
