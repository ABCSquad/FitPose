import { prop, getModelForClass } from "@typegoose/typegoose";
import { ObjectType, Field, InputType } from "type-graphql";

type ExerciseDifficulty = "Beginner" | "Intermediate" | "Advanced";

@ObjectType()
export class Exercise {
  @Field(() => String)
  readonly _id: string;

  @Field(() => String)
  @prop({ required: true, unique: true })
  name!: string;

  @Field(() => String)
  @prop({ required: true })
  difficulty!: ExerciseDifficulty;

  @Field(() => [String])
  @prop({ required: true })
  tags!: string[];

  @Field(() => [String])
  @prop({ required: true })
  steps!: string[];

  @Field(() => String)
  @prop()
  gif1!: string;

  @Field(() => String)
  @prop()
  gif2!: string;
}

export const ExerciseModel = getModelForClass(Exercise);

@InputType()
export class ExerciseInput {
  @Field(() => String)
  name!: string;

  @Field(() => String)
  difficulty!: ExerciseDifficulty;

  @Field(() => [String])
  tags!: String[];

  @Field(() => [String])
  steps!: String[];
}
