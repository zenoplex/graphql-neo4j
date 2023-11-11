import type { GraphQLResolveInfo } from "graphql";
import type { Date, Point } from "neo4j-driver";

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
    location: (
      obj: { location: Point },
      _args: unknown,
      _context: Context,
      _info: GraphQLResolveInfo,
    ) => {
      const { location } = obj;
      return { latitude: location.x, longitude: location.y };
    },
  },
  Review: {
    date: (obj: { date: Date }) => {
      const { date } = obj;
      return date.toString();
    },
  },
};
