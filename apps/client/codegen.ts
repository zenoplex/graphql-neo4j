import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "../server/schema.graphql",
  documents: ["app/graphql/**/*.graphql"],
  generates: {
    "app/graphql/operations.ts": {
      // preset: 'gql-tag-operations-preset'
      plugins: ["typescript", "typescript-operations", "typed-document-node"],
      config: {
        strictScalars: true,
        scalars: {
          CustomPoint: '{ latitude: "number", longitude: "number" }',
          CustomDate: "string",
        },
      },
    },
  },
};

export default config;
