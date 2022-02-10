import NextDocument, { Html, Head, Main, NextScript } from "next/document";
import { ColorModeScript } from "@chakra-ui/react";

export default class Document extends NextDocument {
  render() {
    return (
      <Html style={{ overflowX: "hidden" }} lang="en">
        <Head>
          <title>FitPose</title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
          <meta
            name="description"
            content="FitPose makes use of AI powered pose estimation or key point detection to guide you while you work out. It does so by correcting your posture while you exercise and giving valuable feedback in the form of distinctive charts."
          />
        </Head>
        <body style={{ overflowX: "hidden" }}>
          {/* Make Color mode to persists when you refresh the page. */}
          <ColorModeScript />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
