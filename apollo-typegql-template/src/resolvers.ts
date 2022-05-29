import { User } from "./entity/User";
import dataSource from "../app-data-source";

// Provide resolver functions for your schema fields

export const resolvers = {
  Query: {
    getUser: async (_: any, args: any) => {
      const { id } = args;

      return await dataSource
        .getRepository(User)
        .findOne({ where: { id: id } });
    },
  },
  Mutation: {
    addUser: async (_: any, args: any) => {
      const { firstName, lastName, age } = args;
      try {
        const user = dataSource.getRepository(User).create({
          firstName,
          lastName,
          age,
        });

        await dataSource.getRepository(User).save(user);

        return true;
      } catch (error) {
        console.log(error);

        return false;
      }
    },
  },
};
