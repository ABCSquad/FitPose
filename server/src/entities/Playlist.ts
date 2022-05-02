import {
  prop,
  getModelForClass,
  Ref,
  modelOptions,
  Severity,
} from "@typegoose/typegoose";
import { ObjectType, Field, InputType } from "type-graphql";
import { Exercise } from "./Exercise";
import { User } from "./User";

@InputType()
export class AddExerciseInput {
  @Field(() => String)
  playlistId!: string;

  @Field(() => String)
  exerciseId!: string;
}

@ObjectType()
@modelOptions({ options: { allowMixed: Severity.ALLOW } })
export class Playlist {
  @Field(() => String)
  readonly _id: string;

  @Field(() => String)
  @prop({ required: true })
  name!: string;

  @Field(() => User)
  @prop({ ref: User, required: true })
  user!: Ref<User>;

  @Field(() => [Exercise])
  @prop({ default: [] })
  exercises: Exercise[];
}

export const PlaylistModel = getModelForClass(Playlist);
