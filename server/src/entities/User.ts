import { getModelForClass, prop } from "@typegoose/typegoose";
import { IsEmail, MaxLength, MinLength } from "class-validator";
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

  @Field(() => String)
  name: string;

  @MinLength(8, {
    message: "Password has to be at least 8 characters long",
  })
  @MaxLength(40, {
    message: "Password cannot be longer than 40 characters",
  })
  @Field(() => String)
  password: string;
}

@InputType()
export class LoginInput {
  @Field(() => String)
  email: string;

  @Field(() => String)
  password: string;
}
