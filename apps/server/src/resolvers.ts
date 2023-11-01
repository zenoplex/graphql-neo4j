import type { GraphQLResolveInfo } from "graphql";

type Context = unknown;

export const resolvers = {
  Business: {
    waitTime: (
      _obj: unknown,
      _args: unknown,
      _context: Context,
      _info: GraphQLResolveInfo,
    ) => {
      const options = [0, 5, 10, 15, 30, 45];
      return options[Math.floor(Math.random() * options.length)];
    },
  },
};
