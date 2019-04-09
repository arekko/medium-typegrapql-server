import { ApolloServer } from "apollo-server-express";
import connectRedis from "connect-redis";
import Express from "express";
import session from "express-session";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import { GetArticleResolver } from "./modules/article/getArticle/GetArticle";
import { GetArticles } from "./modules/article/getArticles/GetArticles";
import { BookmarkResolver } from "./modules/user/Bookmark";
import { LoginResolver } from "./modules/user/Login";
import { LogoutResolver } from "./modules/user/Logout";
import { MeResolver } from "./modules/user/Me";
import { RegisterResolver } from "./modules/user/Register";
import { redis } from "./redis";

const main = async () => {
  await createConnection();

  const schema = await buildSchema({
    resolvers: [
      RegisterResolver,
      LoginResolver,
      MeResolver,
      GetArticles,
      LogoutResolver,
      GetArticleResolver,
      BookmarkResolver
    ]
    // authChecker: ({ context: { req } }) => {
    // return !!req.session.userId;
    // }
  });

  const apolloServer = new ApolloServer({
    schema,
    context: ({ req, res }) => ({ req, res })
  });
  const app = Express();

  const RedisStore = connectRedis(session);

  const sessionOption: session.SessionOptions = {
    store: new RedisStore({
      client: redis as any
    }),
    name: "qid",
    secret: "askjdfhaksjdhfaksjdf" || "",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 1000 * 60 * 60 * 24 * 7 * 365 // 7 years
    }
  };

  app.use(session(sessionOption));

  apolloServer.applyMiddleware({
    app,
    cors: {
      credentials: true,
      origin: "http://localhost:3000"
    }
  });

  // apolloServer.applyMiddleware({ app });

  app.listen(4000, () => {
    console.log("====================================");
    console.log("Server started on http://localhost:4000");
    console.log("====================================");
  });
};

main();
