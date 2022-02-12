import { getModelForClass, prop } from "@typegoose/typegoose";
import { IsEmail, IsNotEmpty, Length } from "class-validator";
import { Field, InputType, ObjectType } from "type-graphql";

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

@InputType()
export class RegisterInput {
  @IsEmail()
  @Field(() => String)
  email: string;

  @IsNotEmpty()
  @Field(() => String)
  name: string;

  @Length(8, 40)
  @Field(() => String)
  password: string;
}

@InputType()
export class LoginInput {
  @IsNotEmpty()
  @Field(() => String)
  email: string;

  @IsNotEmpty()
  @Field(() => String)
  password: string;
}
