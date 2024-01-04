import { createYoga, createSchema } from "graphql-yoga";
import { createServer } from "node:http";
import { readFileSync } from "node:fs";
import { resolvers } from "./resolvers";
import { DataSource, LocalDataSource, MongoDB } from "./dataSource";
import * as dotenv from "dotenv";

dotenv.config();

const typeDefs = readFileSync("./src/schema.graphql", "utf8");
// console.log("resolvers: ", resolvers);
const schema = createSchema({ typeDefs, resolvers });
console.log(`Using ${process.env.DATA_STORAGE} for data storage`);
const dataSource: DataSource =
  process.env.DATA_STORAGE === "mongo"
    ? new MongoDB()
    : new LocalDataSource(200);
const yoga = createYoga({ schema, context: { dataSource } });
const server = createServer(yoga);

// Start the server and you're done!
server.listen(4000, () => {
  console.info("Server is running on http://localhost:4000/graphql");
});
