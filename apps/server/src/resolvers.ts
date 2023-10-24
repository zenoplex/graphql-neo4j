import type { GraphQLResolveInfo, GraphQLTypeResolver } from 'graphql';
import type { Db } from './db';
import { split } from './utils';

interface Context {
  db: Db;
}

type Business = Db['businesses'][number];

interface BusinessBySearchTermArgs {
  search: string;
  first: number
  offset:number
  orderBy: 'name_asc' | 'name_desc'
}

export const resolvers = {
  Query: {
    allBusinesses: (_obj: unknown, _args: unknown, context: Context, _info: GraphQLResolveInfo) => {
      return context.db.businesses;
    },
    businessBySearchTerm: (_obj: unknown, args: BusinessBySearchTermArgs, context: Context, _info: GraphQLResolveInfo) => {
      const compare = (a: Business, b: Business): number => {
        const [orderField, order] = split(args.orderBy,'_');
        const left = a[orderField];
        const right = b[orderField];

        if (left < right ) {
          return order === 'asc' ? -1 : 1;
        } else if (left > right) {
          return order === 'desc' ? -1 : 1;
        } 
          return 0;   
      }

      return context.db.businesses.filter(business => business.name.includes(args.search)).slice(args.offset, args.first)
      .sort(compare);
    }
  },
  Business: {
    reviews: (obj: Business, _args: unknown, context: Context, _info: GraphQLResolveInfo) => {
      return obj.reviewIds.map(review => {
        return context.db.reviews.find(v => {
          return v.reviewId === review
        })
      })
    }
  }
}
