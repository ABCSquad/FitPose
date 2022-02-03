import {
  Box,
  Text,
  Grid,
  GridItem,
  Heading,
  Flex,
  Button,
} from "@chakra-ui/react";
import { useEffect } from "react";
import Layout from "../components/Layout";
import { withUrqlClient } from "next-urql";
import createUrqlClient from "../utils/createUrqlClient";

const Index = () => {
  useEffect(() => {
    import("@lottiefiles/lottie-player");
  });

  return (
    <>
      <Box minH="100vh" bg="brand">
        <Layout>
          <Grid
            templateColumns={{ sm: "repeat(1, 1fr)", md: "repeat(3, 1fr)" }}
          >
            <GridItem colSpan={1}>
              <Flex align="center" h="100%">
                <Box>
                  <Heading fontSize="100px" my="20px">
                    Train. Reflect. Master.
                  </Heading>
                  <Text fontSize="22px" my="20px">
                    FitPose uses AI to guide you in your workouts so that you
                    can achieve your fitness goals.
                  </Text>
                  <Button colorScheme="teal" size="lg" my="20px">
                    Get Started
                  </Button>
                </Box>
              </Flex>
            </GridItem>
            <GridItem colSpan={2}>
              <Flex align="center" h="100%">
                <lottie-player
                  autoplay
                  loop
                  mode="normal"
                  src="./lotties/runner.json"
                  style={{ height: "840px" }}
                ></lottie-player>
              </Flex>
            </GridItem>
          </Grid>
        </Layout>
      </Box>
    </>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
