import { User, RegisterInput, UserModel, LoginInput } from "../entities/User";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import argon2 from "argon2";
import { Context } from "../types";

@Resolver()
export default class UserResolver {
  @Mutation(() => User)
  async register(@Arg("input") input: RegisterInput, @Ctx() { req }: Context) {
    const hashedPassword = await argon2.hash(input.password);
    const user = await UserModel.create({ ...input, password: hashedPassword });
    req.session.userId = user._id.toString();
    return user;
  }

  @Mutation(() => User)
  async login(@Arg("input") input: LoginInput, @Ctx() { req }: Context) {
    const user = await UserModel.findOne({ email: input.email });
    if (user) {
      const valid = await argon2.verify(user.password, input.password);
      if (valid) {
        req.session.userId = user._id.toString();
        return user;
      }
    }
    return null;
  }

  @Query(() => User)
  me() {
    return {
      _id: 1,
      email: "email",
      name: "name",
      password: "password",
    };
  }
}
