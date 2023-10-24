import { ApolloServer } from "apollo-server";
import { typeDefs } from "./schema";
import { resolvers } from "./resolvers";
import { db } from "./db";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: { db },
});

const { url } = await server.listen();
// eslint-disable-next-line no-console -- display server url
console.log(`🚀  Server ready at ${url}`);
