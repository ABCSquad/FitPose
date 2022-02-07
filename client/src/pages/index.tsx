import {
  Box,
  Text,
  Grid,
  GridItem,
  Heading,
  Flex,
  Button,
  Img,
} from "@chakra-ui/react";
import { useEffect } from "react";
import Layout from "../components/Layout";
import { withUrqlClient } from "next-urql";
import createUrqlClient from "../utils/createUrqlClient";
import Feature from "../components/Feature";

const Index = () => {
  useEffect(() => {
    import("@lottiefiles/lottie-player");
  });

  return (
    <>
      <Box minH="100vh" bg="brand.teal">
        <Layout nav>
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
                    Get Started For Free
                  </Button>
                </Box>
              </Flex>
            </GridItem>
            <GridItem colSpan={2}>
              <Flex align="center" h="100%">
                <Img src="./svgs/blobs.svg" position="absolute" />
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

      <Img src="./svgs/wave1.svg" width="100%" />

      <Box bg="">
        <Layout>
          <Heading fontSize="3.75rem" mb="20px">
            Push your fitness game to the next level.
          </Heading>
          <Grid
            templateColumns={{ sm: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }}
          >
            <Feature
              icon="application"
              heading="Choose your workout"
              body={[
                "Select from a wide range of exercises.",
                "Shortlist your favourite exercises for easy access.",
              ]}
            />
            <Feature
              icon="exercise"
              heading="Prepare for the exercise"
              body={[
                "Break down the exercise into simple steps.",
                "Watch demonstrative videos for complete understanding.",
              ]}
            />
            <Feature
              icon="play"
              heading="Real-time assessment"
              body={["Select from a wide range of exercises", "2"]}
            />
            <Feature
              icon="review"
              heading="Review your performance"
              body={["Select from a wide range of exercises", "2"]}
            />
          </Grid>
        </Layout>
      </Box>

      <Img src="./svgs/wave2.svg" width="100%" />
    </>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
