// user resolver
import { Args, Mutation, Query, Resolver } from "type-graphql";
import dataSource from "../../app-data-source";
import { User } from "../entity/User";

@Resolver()
export class UserResolver {
  @Query(() => User, { nullable: true })
  async getUser(@Args("id") id: number) {
    return await dataSource.getRepository(User).findOne({ where: { id: id } });
  }

  @Mutation(() => User)
  async addUser(
    @Args("firstName") firstName: string,
    @Args("lastName") lastName: string,
    @Args("age") age: number
  ): Promise<boolean> {
    try {
      const user = dataSource.getRepository(User).create({
        firstName,
        lastName,
        age,
      });

      await user.save();

      return true;
    } catch (error) {
      return false;
    }
  }
}
