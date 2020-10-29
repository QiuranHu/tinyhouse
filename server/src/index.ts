import express, { Application } from "express";
import { ApolloServer } from "apollo-server-express";
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

import { typeDefs, resolvers } from "./graphql";
import { connectDatabase } from "./database";

const mount = async (app: Application) => {
  const db = await connectDatabase();
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => ({ db }),
  }); // Create an ApolloServer instance.
  server.applyMiddleware({ app, path: "/api" }); // Connect ApolloServer with Express. GraphQL API is on /api path.

  app.listen(process.env.PORT);

  console.log(`[app]: http://localhost:${process.env.PORT}`);
};

mount(express());
