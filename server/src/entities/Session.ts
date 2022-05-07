import { prop, getModelForClass } from "@typegoose/typegoose";
import { ObjectType, Field } from "type-graphql";
import { User } from "./User";

type SessionExercise = {
  name: string;
  sets: [reps: { endTime: Date; wrongForm: [{start: Date, end: Date}] }];
};

@ObjectType()
export class Session {
  @Field()
  readonly _id: string;

  @Field(() => User)
  @prop({ ref: User, required: true })
  user!: User;

  @Field()
  @prop({ required: true })
  datetime!: Date;

  @Field(() => [Number, [[Date, [Boolean]]]])
  @prop({ required: true })
  exercises!: SessionExercise[];
}

export const SessionModel = getModelForClass(Session);
