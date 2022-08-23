import "dotenv/config";

import { ApolloServer } from "apollo-server";
import { typeDefs } from "./typeDefs";
import { resolvers } from "./resolvers";
import dataSources from "./dataSources";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources,
});

async function main() {
  const { url } = await server.listen();

  console.log(`Server ready at ${url}`);
}

main();
