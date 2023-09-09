import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

import { typeDefs } from "./graphql/typeDefs.generated";
import { resolvers } from "./graphql/resolvers.generated";
import { Prisma, PrismaClient } from "@prisma/client";

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const prisma = new PrismaClient({
  log: ["query", "info", "warn", "error"],
});

const { url } = await startStandaloneServer(server, {
  context: async () => {
    return {
      prisma,
    }
  }
});

console.log(`🚀 Server ready at ${url}`);
