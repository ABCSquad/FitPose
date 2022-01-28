import { UserModel } from "./entities/User";
import dotenv from "dotenv";
import "reflect-metadata";
import express from "express";
import { buildSchema } from "type-graphql";
import {
  ApolloServerPluginLandingPageGraphQLPlayground,
  ApolloServerPluginLandingPageProductionDefault,
} from "apollo-server-core";
import { ApolloServer } from "apollo-server-express";
import { COOKIE_NAME, __prod__ } from "./constants";
import { Context } from "./types";
import UserResolver from "./resolvers/user";
import { connect } from "mongoose";
import session from "express-session";
import connectRedis from "connect-redis";
import Redis from "ioredis";
import cors from "cors";

dotenv.config();

const bootstrap = async () => {
  try {
    const app = express();

    const RedisStore = connectRedis(session);

    const redis = new Redis(process.env.REDIS_URl);

    app.set("trust proxy", 1);

    const appCors = cors({
      origin: process.env.CORS_ORIGIN,
      credentials: true,
    });

    const appSession = session({
      name: COOKIE_NAME,
      store: new RedisStore({
        client: redis,
        disableTouch: true,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
        sameSite: "lax",
        secure: __prod__,
      },
      saveUninitialized: false,
      secret: process.env.SESSION_SECRET as string,
      resave: false,
    });

    app.use(appCors, appSession);

    const schema = await buildSchema({
      resolvers: [UserResolver],
    });

    const plugins = [
      __prod__
        ? ApolloServerPluginLandingPageProductionDefault()
        : ApolloServerPluginLandingPageGraphQLPlayground(),
    ];

    const context = ({ req, res }: Context) => ({ req, res });

    const apolloServer = new ApolloServer({
      schema,
      context,
      plugins,
    });

    await apolloServer.start();

    apolloServer.applyMiddleware({ app });

    app.listen(parseInt(process.env.PORT as string), () => {
      console.log(`Server started on http://localhost:${process.env.PORT}`);
    });

    await connect(process.env.DATABASE_URL as string);
    // await UserModel.deleteMany({});
    console.log("Connected to database");
  } catch (err) {
    console.error(err);
  }
};

bootstrap();
