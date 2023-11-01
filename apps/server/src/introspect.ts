import fs from "node:fs/promises";
import { toGraphQLTypeDefs } from "@neo4j/introspector";
import { driver, auth, session } from "neo4j-driver";

const { NEO4J_AUTH, DB_URL } = process.env;
if (!(NEO4J_AUTH && DB_URL)) {
  throw new Error("Missing NEO4J_AUTH, DB_URL environment variable");
}

const [username, password] = NEO4J_AUTH.split("/");
const neo4jDriver = driver(DB_URL, auth.basic(username, password));

const sessionFactory = () =>
  neo4jDriver.session({ defaultAccessMode: session.READ });

const typeDefs = await toGraphQLTypeDefs(sessionFactory);
await fs.writeFile("schema.graphql", typeDefs);
await neo4jDriver.close();
