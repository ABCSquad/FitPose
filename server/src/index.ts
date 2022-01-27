import dotenv from "dotenv";
import "reflect-metadata";
import express from "express";
import { buildSchema } from "type-graphql";
import {
  ApolloServerPluginLandingPageGraphQLPlayground,
  ApolloServerPluginLandingPageProductionDefault,
} from "apollo-server-core";
import { ApolloServer } from "apollo-server-express";
import { __prod__ } from "./constants";
import { Context } from "./types";
import UserResolver from "./resolvers/user";
import { connect } from "mongoose";

dotenv.config();

const bootstrap = async () => {
  try {
    const app = express();

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

    app.listen(process.env.PORT, () => {
      console.log(`Server started on http://localhost:${process.env.PORT}`);
    });

    await connect("mongodb://localhost:27017/fitpose");
  } catch (err) {
    console.error(err);
  }
};

bootstrap();
