import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { ExerciseModel } from "../entities/Exercise";
import {
  AddExerciseInput,
  Playlist,
  PlaylistModel,
} from "../entities/Playlist";
import { UserModel } from "../entities/User";
import { Context } from "../types";

@Resolver()
export default class ExerciseResolver {
  @Query(() => Playlist)
  async playlist(@Arg("id") id: string): Promise<Playlist | null> {
    return await PlaylistModel.findById(id);
  }

  @Query(() => [Playlist])
  async myPlaylists(@Ctx() { req }: Context): Promise<Playlist[]> {
    return await PlaylistModel.find({ user: req.session.userId });
  }

  @Mutation(() => Playlist)
  async createPlaylist(
    @Arg("name") name: String,
    @Ctx() { req }: Context
  ): Promise<Playlist> {
    // Check if logged in
    if (!req.session.userId) throw new Error("No user");
    const playlist = new PlaylistModel({
      name,
      user: await UserModel.findById(req.session.userId),
    });
    return await playlist.save();
  }

  @Mutation(() => Playlist)
  async addExercise(
    @Arg("input") { playlistId, exerciseId }: AddExerciseInput,
    @Ctx() { req }: Context
  ): Promise<Playlist> {
    const playlist = await PlaylistModel.findById(playlistId);
    if (!playlist) throw new Error("Invalid playlist ID");
    if (playlist.user && req.session.userId !== playlist.user.toString())
      throw new Error("Invalid auth");
    const exercise = await ExerciseModel.findById(exerciseId);
    if (!exercise) throw new Error("Invalid exercise ID");
    if (playlist.exercises.some((x) => x._id.toString() === exerciseId))
      throw new Error("Exercise already present");
    playlist.exercises.push(exercise);
    return await playlist.save();
  }

  @Mutation(() => Playlist)
  async removeExercise(
    @Arg("input") { playlistId, exerciseId }: AddExerciseInput,
    @Ctx() { req }: Context
  ): Promise<Playlist> {
    const playlist = await PlaylistModel.findById(playlistId);
    if (!playlist) throw new Error("Invalid playlist ID");
    if (playlist.user && req.session.userId !== playlist.user.toString())
      throw new Error("Invalid auth");
    const exercise = await ExerciseModel.findById(exerciseId);
    if (!exercise) throw new Error("Invalid exercise ID");
    if (!playlist.exercises.some((x) => x.name === exercise.name))
      throw new Error("Exercise not present");
    playlist.exercises = playlist.exercises.filter(
      (x) => x._id.toString() !== exerciseId
    );
    return await playlist.save();
  }
}
