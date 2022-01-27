import { User } from "../entities/User";
import { Query, Resolver } from "type-graphql";

@Resolver()
export default class UserResolver {
  @Query(() => User)
  me() {
    return {
      _id: 1,
      email: "email",
      name: "name",
      password: "password"
    };
  }
}
