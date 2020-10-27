import express from "express";
import { ApolloServer } from "apollo-server-express";
import { schema } from "./graphql";
const app = express();
const port = 9000;

const server = new ApolloServer({ schema }); // Create an ApolloServer instance.
server.applyMiddleware({ app, path: "/api" }); // Connect ApolloServer with Express. GraphQL API is on /api path.

app.listen(port);

console.log(`[app]: http://localhost:${port}`);
