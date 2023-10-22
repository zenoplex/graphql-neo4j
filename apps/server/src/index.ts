import { ApolloServer } from 'apollo-server';
import { typeDefs } from './schema';
import { resolvers } from './resolvers';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: { db : {}}
});

const { url } = await server.listen();
console.log(`🚀  Server ready at ${url}`);
