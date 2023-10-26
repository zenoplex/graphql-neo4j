import { ApolloServer } from "apollo-server";
import { driver, auth } from "neo4j-driver";
import { Neo4jGraphQL } from "@neo4j/graphql";
import { typeDefs } from "./schema";

const { NEO4J_AUTH, DB_URL } = process.env;
if (!(NEO4J_AUTH && DB_URL)) {
  throw new Error("Missing NEO4J_AUTH, DB_URL environment variable");
}

const [username, password] = NEO4J_AUTH.split("/");
const neo4jDriver = driver(DB_URL, auth.basic(username, password));

const neoSchema = new Neo4jGraphQL({ typeDefs, driver: neo4jDriver });
const schema = await neoSchema.getSchema();
const server = new ApolloServer({
  schema,
});
const { url } = await server.listen();
// eslint-disable-next-line no-console -- display server url
console.log(`🚀  Server ready at ${url}`);
