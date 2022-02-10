import { extendTheme } from "@chakra-ui/react";
import { createBreakpoints } from "@chakra-ui/theme-tools";

const fonts = {
  heading: "Montserrat",
  body: "Catamaran",
  mono: `'Menlo', monospace`,
};

const breakpoints = createBreakpoints({
  sm: "40em",
  md: "52em",
  lg: "64em",
  xl: "80em",
});

const theme = extendTheme({
  colors: {
    black: "#16161D",
    brand: {
      teal: "#BBECE3",
      lightpink: "#fbdce2",
      darkpink: "#ff9fb2",
      lightgrey: "#F7FAFC",
      darkgrey: "#666666",
      lavender: "#685f74",
    },
  },
  fonts,
  breakpoints,
});

export default theme;
