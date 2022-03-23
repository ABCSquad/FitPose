import { Exercise, ExerciseInput, ExerciseModel } from "../entities/Exercise";
import { Resolver, Query, Mutation, Arg } from "type-graphql";

@Resolver()
export default class ExerciseResolver {
  @Query(() => [Exercise])
  async exercises(): Promise<Exercise[]> {
    return await ExerciseModel.find();
  }

  @Mutation(() => Exercise)
  async createExercise(@Arg("input") input: ExerciseInput): Promise<Exercise> {
    const exercise = new ExerciseModel(input);
    return await exercise.save();
  }
}
