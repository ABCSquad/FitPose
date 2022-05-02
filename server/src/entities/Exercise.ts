import {
  getModelForClass,
  modelOptions,
  prop,
  Severity,
} from "@typegoose/typegoose";
import { Field, InputType, ObjectType } from "type-graphql";

type ExerciseDifficulty = "Beginner" | "Intermediate" | "Advanced";

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

@ObjectType()
@modelOptions({ options: { allowMixed: Severity.ALLOW } })
export class Exercise {
  @Field(() => String)
  readonly _id: string;

  @Field(() => String)
  @prop({ required: true })
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
