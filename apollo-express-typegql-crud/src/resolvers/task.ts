import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Task } from "../entities/Task";
import dataSource from "../../app-data-source";

@Resolver()
export class TaskResolver {
  @Query(() => [Task])
  async tasks(): Promise<Task[]> {
    return dataSource.getRepository(Task).find();
  }

  // @Query(() => Task, { nullable: true })
  // async task(@Arg("id", () => Int) id: number): Promise<Task | undefined> {
  //   return dataSource.getRepository(Task).findOne({ id });
  // }

  @Mutation(() => Task)
  createTask(
    @Arg("title", () => String) title: string,
    @Arg("description", () => String) description: string
  ): Promise<Task> {
    return dataSource.getRepository(Task).create({ title, description }).save();
  }

  // @Mutation(() => Task, { nullable: true })
  // async updateTask(
  //   @Arg("title", () => String, { nullable: true }) title: string,
  //   @Arg("description", () => String, { nullable: true }) description: string,
  //   @Arg("id", () => Int) id: number
  // ): Promise<Task | null> {
  //   const task = await dataSource.getRepository(Task).findOne(id);
  //   if (!task) {
  //     return null;
  //   }
  //   if (typeof title !== "undefined") {
  //     await dataSource.getRepository(Task).update({ id }, { title });
  //   }

  //   if (typeof description !== "undefined") {
  //     await dataSource.getRepository(Task).update({ id }, { description });
  //   }
  //   return task;
  // }

  // @Mutation(() => Boolean)
  // async deleteTask(@Arg("id", () => Int) id: number): Promise<boolean> {
  //   if (await dataSource.getRepository(Task).findOne({ id })) {
  //     await dataSource.getRepository(Task).delete(id);
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }
}
