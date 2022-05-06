import { ChakraProvider } from "@chakra-ui/react";
import theme from "../theme";
import { AppProps } from "next/app";
import "@fontsource/montserrat/700.css";
import "@fontsource/catamaran/400.css";
import Head from "next/head";
import AppContextProvider from "../contexts/AppContext";
import "../styles/Canvas.styles.css";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>FitPose</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          name="description"
          content="FitPose makes use of AI powered pose estimation or key point detection to guide you while you work out. It does so by correcting your posture while you exercise and giving valuable feedback in the form of distinctive charts."
        />
      </Head>

      <AppContextProvider>
        <ChakraProvider resetCSS theme={theme}>
          <Component {...pageProps} />
        </ChakraProvider>
      </AppContextProvider>
    </>
  );
};

export default MyApp;
