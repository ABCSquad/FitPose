import { Box, Center, Flex, Grid, GridItem, Img } from "@chakra-ui/react";
import NextLink from "next/link";
import { FC, useEffect } from "react";

const AuthLayout: FC = ({ children }) => {
  useEffect(() => {
    import("@lottiefiles/lottie-player");
  });

  return (
    <Flex minH="100vh" bg="brand.lightpink" p={6}>
      <Box bg="white" boxShadow="md" rounded="xl" m="auto" p={10}>
        <Center h={{ base: "60px", md: 20 }}>
          <NextLink href="/">
            <Img src="./svgs/logo.svg" alt="logo" h={10} cursor="pointer" />
          </NextLink>
        </Center>
        <Grid
          templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(3, 1fr)" }}
        >
          <GridItem colSpan={1}>{children}</GridItem>
          <GridItem colSpan={2}>
            <Flex align="center">
              <Box mx="auto" h={{ base: "280px", md: "500px" }}>
                <lottie-player
                  autoplay
                  loop
                  mode="normal"
                  src="./lotties/auth.json"
                  // style={{ height: "100%" }}
                ></lottie-player>
              </Box>
            </Flex>
          </GridItem>
        </Grid>
      </Box>
    </Flex>
  );
};

export default AuthLayout;
