import type { GraphQLResolveInfo } from "graphql";
import type { Db } from "./db";
import { dropUndefined, split } from "./utils";

interface Context {
  db: Db;
}

type Business = Db["businesses"][number];
type User = Db["users"][number];
type Review = Db["reviews"][number];

interface BusinessBySearchTermArgs {
  search: string;
  first: number;
  offset: number;
  orderBy: "name_asc" | "name_desc";
}

export const resolvers = {
  Query: {
    allBusinesses: (
      _obj: unknown,
      _args: unknown,
      context: Context,
      _info: GraphQLResolveInfo,
    ) => {
      return context.db.businesses;
    },
    businessBySearchTerm: (
      _obj: unknown,
      args: BusinessBySearchTermArgs,
      context: Context,
      _info: GraphQLResolveInfo,
    ) => {
      const compare = (a: Business, b: Business): number => {
        const [orderField, order] = split(args.orderBy, "_");
        const left = a[orderField];
        const right = b[orderField];

        if (left < right) {
          return order === "asc" ? -1 : 1;
        } else if (left > right) {
          return order === "desc" ? -1 : 1;
        }
        return 0;
      };

      return context.db.businesses
        .filter((business) => business.name.includes(args.search))
        .slice(args.offset, args.first)
        .sort(compare);
    },
    userById: (_obj: unknown, args: { userId: string }, context: Context) => {
      return context.db.users.find((user) => user.userId === args.userId);
    },
  },
  Business: {
    reviews: (
      obj: Business,
      _args: unknown,
      context: Context,
      _info: GraphQLResolveInfo,
    ) => {
      return obj.reviewIds.map((review) => {
        return context.db.reviews.find((v) => {
          return v.reviewId === review;
        });
      });
    },
    avgStars: (
      obj: Business,
      _args: unknown,
      context: Context,
      _info: GraphQLResolveInfo,
    ) => {
      const reviews = obj.reviewIds
        .map((review) => {
          return context.db.reviews.find((v) => {
            return v.reviewId === review;
          });
        })
        .filter(dropUndefined);

      return (
        reviews.reduce((acc, review) => {
          return acc + review.stars;
        }, 0) / reviews.length
      );
    },
  },
  Review: {
    user: (
      obj: Review,
      _args: unknown,
      context: Context,
      _info: GraphQLResolveInfo,
    ) => {
      return context.db.users.find((user) => {
        return obj.userId === user.userId;
      });
    },
    business: (
      obj: Review,
      _args: unknown,
      context: Context,
      _info: GraphQLResolveInfo,
    ) => {
      return context.db.businesses.find((business) => {
        return obj.businessId === business.businessId;
      });
    },
  },
  User: {
    reviews: (
      obj: User,
      _args: unknown,
      context: Context,
      _info: GraphQLResolveInfo,
    ) => {
      return obj.reviewIds.map((reviewId) => {
        return context.db.reviews.find((review) => {
          return review.reviewId === reviewId;
        });
      });
    },
  },
};
