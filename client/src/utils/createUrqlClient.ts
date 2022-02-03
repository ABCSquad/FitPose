import { cacheExchange, dedupExchange, fetchExchange } from "urql";
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
    exchanges: [dedupExchange, cacheExchange, ssrExchange, fetchExchange],
  };
};

export default createUrlqlClient;
