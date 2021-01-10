import "reflect-metadata";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import path from "path";
import { buildSchema } from "type-graphql";
import helmet from "helmet";

import config from "./config";
import connection from "./config/database";

const setupServer = async () => {
  await connection;
  const app = express();

  const server = new ApolloServer({
    schema: await buildSchema({
      resolvers: [
        path.resolve(
          __dirname,
          `graphql/resolvers/*.${
            process.env.NODE_ENV !== "production" ? "ts" : "js"
          }`
        ),
      ],
    }),
  });

  app.use(
    helmet({
      contentSecurityPolicy:
        process.env.NODE_DEV === "production" ? undefined : false,
    })
  );

  server.applyMiddleware({ app, path: "/graphql" });

  app.listen({ port: config.app.port }, () => {
    console.log(`🚀  Server ready at ${config.app.port}`);
  });
};

setupServer();
