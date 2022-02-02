import isServer from "./isServer";

const createUrlqlClient = (ssrExchange: any, ctx: any) => {
  let cookie = "";
  if (isServer()) cookie = ctx.req.headers.cookie;
  return {
    url: process.env.NEXT_PUBLIC_API_URL as string,
    fetchOptions: {
      credentials: "include" as const,
      headers: cookie ? { cookie } : undefined,
    },
    exchanges: [ssrExchange],
  };
};

export default createUrlqlClient;
