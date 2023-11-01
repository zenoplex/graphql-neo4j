import fs from "node:fs/promises";
import { ApolloServer } from "apollo-server";
import { driver, auth } from "neo4j-driver";
import { Neo4jGraphQL } from "@neo4j/graphql";
import { resolvers } from "./resolvers";

const { NEO4J_AUTH, DB_URL } = process.env;
if (!(NEO4J_AUTH && DB_URL)) {
  throw new Error("Missing NEO4J_AUTH, DB_URL environment variable");
}

const [username, password] = NEO4J_AUTH.split("/");
const neo4jDriver = driver(DB_URL, auth.basic(username, password));

const typeDefs = await fs.readFile(
  new URL("./schema.graphql", import.meta.url),
  "utf-8",
);

const neoSchema = new Neo4jGraphQL({
  typeDefs,
  resolvers,
  driver: neo4jDriver,
});
const schema = await neoSchema.getSchema();
const server = new ApolloServer({
  schema,
});
const { url } = await server.listen();
// eslint-disable-next-line no-console -- display server url
console.log(`🚀  Server ready at ${url}`);
