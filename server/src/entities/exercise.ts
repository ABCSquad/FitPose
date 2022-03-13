import { prop, getModelForClass } from "@typegoose/typegoose";
import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class Exercise {
  @Field(() => String)
  readonly _id: string;

  @Field(() => String)
  @prop({ required: true, unique: true })
  name!: string;

  @Field(() => [String])
  @prop({ required: true })
  tags!: string[];

  @Field(() => [String])
  @prop({ required: true })
  steps!: string[];
}

export const ExerciseModel = getModelForClass(Exercise);