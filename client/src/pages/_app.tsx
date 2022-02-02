import { ChakraProvider } from "@chakra-ui/react";
import theme from "../theme";
import { AppProps } from "next/app";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
      <ChakraProvider resetCSS theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
  );
};

export default MyApp;
