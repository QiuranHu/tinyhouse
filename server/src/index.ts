import express, { Application } from "express";
import { ApolloServer } from "apollo-server-express";
import { typeDefs, resolvers } from "./graphql";
import { connectDatabase } from "./database";
const port = 9000;

const mount = async (app: Application) => {
  const db = await connectDatabase();
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => ({ db }),
  }); // Create an ApolloServer instance.
  server.applyMiddleware({ app, path: "/api" }); // Connect ApolloServer with Express. GraphQL API is on /api path.

  app.listen(port);

  console.log(`[app]: http://localhost:${port}`);
};

mount(express());
