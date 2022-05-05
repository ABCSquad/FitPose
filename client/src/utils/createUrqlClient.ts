import { cacheExchange } from "@urql/exchange-graphcache";
import { dedupExchange, fetchExchange } from "urql";
import {
  LoginMutation,
  LogoutMutation,
  MeDocument,
  MeQuery,
  RegisterMutation,
} from "../generated/graphql";
import betterUpdateQuery from "./betterUpdateQuery";
import isServer from "./isServer";

const createUrlqlClient = (ssrExchange: any, ctx: any) => {
  let cookie = "";
  //Forward cookie only if ssr
  if (isServer() && ctx) cookie = ctx?.req?.headers?.cookie;
  return {
    url: process.env.NEXT_PUBLIC_API_URL as string,
    fetchOptions: {
      credentials: "include" as const,
      headers: cookie ? { cookie } : undefined,
    },
    exchanges: [
      dedupExchange,
      cacheExchange({
        updates: {
          Mutation: {
            logout: (_result, _, cache, __) => {
              betterUpdateQuery<LogoutMutation, MeQuery>(
                cache,
                { query: MeDocument },
                _result,
                () => ({ me: null })
              );
            },
            login: (_result, _, cache, __) => {
              betterUpdateQuery<LoginMutation, MeQuery>(
                cache,
                { query: MeDocument },
                _result,
                (result, query) => {
                  if (!result.login) {
                    return query;
                  } else {
                    return { me: result.login };
                  }
                }
              );
            },
            register: (_result, _, cache, __) => {
              betterUpdateQuery<RegisterMutation, MeQuery>(
                cache,
                { query: MeDocument },
                _result,
                (result, query) => {
                  if (!result?.register?._id) {
                    return query;
                  } else {
                    return { me: result.register };
                  }
                }
              );
            },
            addExercise: (_result, _, cache, __) => {
              cache.invalidate("Query", "playlist", {
                id: (_result.addExercise as any)._id,
              });
            },
            removeExercise: (_result, _, cache, __) => {
              cache.invalidate("Query", "playlist", {
                id: (_result.removeExercise as any)._id,
              });
            },
            deletePlaylist: (_result, _, cache, __) => {
              cache.invalidate("Query", "myPlaylists");
            },
          },
        },
      }),
      ssrExchange,
      fetchExchange,
    ],
  };
};

export default createUrlqlClient;
