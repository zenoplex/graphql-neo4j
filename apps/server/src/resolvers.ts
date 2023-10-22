import type { GraphQLResolveInfo } from 'graphql';

export const resolvers = {
  Query: {
    allBusinesses: (_obj: unknown, _args: unknown, context: any, _info: GraphQLResolveInfo) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return -- this is a mock
      return context.db.businesses;
    },
  }
}
