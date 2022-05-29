// apollo graphql hello world
import { ApolloServer, gql } from "apollo-server-express";
import express from "express";

const app = express();

const typeDefs = gql`
  type Query {
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello: () => "Hello world!",
  },
};
const server = new ApolloServer({ typeDefs, resolvers });
const main = async () => {
  await server.start();
  server.applyMiddleware({ app });
};
main();
app.listen({ port: 4000 }, () => {
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
});
