import { ChakraProvider } from "@chakra-ui/react";
import theme from "../theme";
import { AppProps } from "next/app";
import { createClient, Provider } from "urql";

const client = createClient({
  url: process.env.NEXT_PUBLIC_API_URL as string,
  fetchOptions: { credentials: "include" },
});

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider value={client}>
      <ChakraProvider resetCSS theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </Provider>
  );
};

export default MyApp;
