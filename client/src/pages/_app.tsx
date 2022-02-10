import { ChakraProvider } from "@chakra-ui/react";
import theme from "../theme";
import { AppProps } from "next/app";
import "@fontsource/montserrat/700.css";
import "@fontsource/catamaran/400.css";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
};

export default MyApp;
