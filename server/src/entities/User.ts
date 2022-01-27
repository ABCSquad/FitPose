import { getModelForClass, prop } from "@typegoose/typegoose";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class User {
  @Field(() => String)
  readonly _id: string;

  @Field(() => String)
  @prop({ required: true, unique: true })
  email!: string;

  @Field(() => String)
  @prop({ required: true })
  name!: string;

  @prop({ required: true })
  password!: string;
}

export const UserModel = getModelForClass(User);
