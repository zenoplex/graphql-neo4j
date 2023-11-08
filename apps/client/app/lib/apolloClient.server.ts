import { ApolloClient, InMemoryCache } from "@apollo/client";

export const apolloClient = new ApolloClient({
  // TODO: use env
  uri: "http://localhost:4000",
  ssrMode: true,
  cache: new InMemoryCache(),
});
