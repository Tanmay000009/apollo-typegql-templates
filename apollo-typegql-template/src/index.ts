import "reflect-metadata";
import * as express from "express";
import { ApolloServer } from "apollo-server-express";

// import { UserResolver } from "./resolvers/user.resolver";
// import { buildSchema } from "type-graphql";
import { resolvers } from "./resolvers";
import { typeDefs } from "./typeDefs";
import dataSource from "../app-data-source"
const PORT = process.env.PORT || 4000;

const main = async () => {
  try {

    dataSource
    .initialize()
    .then(() => {
      console.log("Data Source has been initialized!");
    })
    .catch((err) => {
      console.error("Error during Data Source initialization:", err);
    });

    const app = express();

    // Create the GraphQL server
    const apolloServer = new ApolloServer({
      typeDefs,
      resolvers,
    });
    await apolloServer.start();
    apolloServer.applyMiddleware({ app });

    // Start the server
    app.listen(PORT, () =>
      console.log(`Server started http://localhost:${PORT}/graphql`)
    );
  } catch (err) {
    console.error(err);
  }
};

main().catch((err) => console.log(err));
