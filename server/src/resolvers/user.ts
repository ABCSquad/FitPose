import { User, RegisterInput, UserModel, LoginInput } from "../entities/user";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import argon2 from "argon2";
import { Context } from "../types";
import { ApolloError } from "apollo-server";
import { COOKIE_NAME } from "../constants";

@Resolver()
export default class UserResolver {
  @Query(() => User, { nullable: true })
  async me(@Ctx() { req }: Context): Promise<User | null> {
    return req.session.userId ? UserModel.findById(req.session.userId) : null;
  }

  @Mutation(() => User)
  async register(
    @Arg("input") input: RegisterInput,
    @Ctx() { req }: Context
  ): Promise<User> {
    const existingUser = await UserModel.findOne({ email: input.email });
    if (existingUser) throw new ApolloError("Account already exists");
    const hashedPassword = await argon2.hash(input.password);
    const user = await UserModel.create({ ...input, password: hashedPassword });
    req.session.userId = user._id.toString();
    return user;
  }

  @Mutation(() => User)
  async login(
    @Arg("input") input: LoginInput,
    @Ctx() { req }: Context
  ): Promise<User> {
    const user = await UserModel.findOne({ email: input.email });
    if (!user) throw new ApolloError("Account does not exist");
    const authenticated = await argon2.verify(user.password, input.password);
    if (!authenticated) throw new ApolloError("Incorrect password");
    req.session.userId = user._id.toString();
    return user;
  }

  @Mutation(() => Boolean)
  logout(@Ctx() { req, res }: Context) {
    return new Promise((resolve) =>
      req.session.destroy((err) => {
        if (err) {
          console.error(err);
          resolve(false);
          return;
        }
        res.clearCookie(COOKIE_NAME);
        resolve(true);
      })
    );
  }
}
