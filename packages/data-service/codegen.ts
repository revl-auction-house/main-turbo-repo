import type { CodegenConfig } from "@graphql-codegen/cli";
// import {ContextType} from "./src/models";

const config: CodegenConfig = {
  schema: "src/schema.graphql",
  generates: {
    "./src/resolvers/resolvers-types.ts": {
      plugins: ["typescript", "typescript-resolvers"],
    },
  },
};
export default config;
