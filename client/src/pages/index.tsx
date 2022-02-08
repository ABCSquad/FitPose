import NextLink from "next/link";
import {
  Box,
  Text,
  Grid,
  GridItem,
  Heading,
  Flex,
  Button,
  Img,
  ListItem,
  UnorderedList,
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
                  <Heading fontSize="100px" mt={5}>
                    Train.
                  </Heading>
                  <Heading fontSize="100px">Reflect.</Heading>
                  <Heading fontSize="100px" mb={5}>
                    Master.
                  </Heading>
                  <Text fontSize="22px" my={5}>
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

      <Flex minH="100vh" bg="brand.lightgrey" align="center">
        <Layout>
          <Heading fontSize="4rem" mb={2}>
            Push your fitness game to the next level.
          </Heading>
          <Text fontSize="1.25rem" mb={6} color="grey">
            The power of AI comes with great responsibility. We aren't looking
            to deploy the terminator; we are just attempting to take care of
            you!
          </Text>
          <Grid
            templateColumns={{ sm: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }}
            templateRows={{ sm: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }}
          >
            <Feature
              icon="application"
              heading="Choose your workout"
              body={[
                "Wide range of exercises to select from.",
                "Shortlist your favourite exercises for easy access.",
              ]}
            />
            <Feature
              icon="exercise"
              heading="Prepare for the exercise"
              body={[
                "Breaking down of exercises into simple steps.",
                "Demonstrative videos for complete understanding.",
              ]}
            />
            <Feature
              icon="play"
              heading="Get real-time assistance"
              body={[
                "AI powered pose estimation - along with helpful feedback - to guide you continuously.",
                "Video guides to follow along as you work out.",
              ]}
            />
            <Feature
              icon="review"
              heading="Review your performance"
              body={[
                "Data visualization in the form of distinctive charts.",
                "Long-time progress assessment over the sessions.",
              ]}
            />
          </Grid>
        </Layout>
      </Flex>

      <Img src="./svgs/wave2.svg" width="100%" />

      <Box bg="brand.lightpink">
        <Layout>
          <Grid
            templateColumns={{ sm: "repeat(1, 1fr)", md: "repeat(5, 1fr)" }}
          >
            <GridItem colSpan={2} p={10}>
              <lottie-player
                autoplay
                loop
                mode="normal"
                src="./lotties/login.json"
              ></lottie-player>
            </GridItem>
            <GridItem colSpan={3} py={20} px={10}>
              <Box>
                <Heading fontSize="2.5rem">
                  Sign up for free to get additional benefits.
                </Heading>
                <UnorderedList spacing={3} my={5}>
                  <ListItem fontSize="1.2rem" color="brand.darkgrey">
                    User created custom playlists to easily access your
                    frequented exercises.
                  </ListItem>
                  <ListItem fontSize="1.2rem" color="brand.darkgrey">
                    Access to all past workouts to review any session.
                  </ListItem>
                  <ListItem fontSize="1.2rem" color="brand.darkgrey">
                    Over-the-time progress feedback to see how far you've come!
                  </ListItem>
                </UnorderedList>
                <Flex align="center">
                  <NextLink href="/signup">
                    <Button colorScheme="pink" size="lg">
                      Sign Up For Free
                    </Button>
                  </NextLink>
                  <Text mx={5}>or</Text>
                  <Button size="lg">Get Started Anyway</Button>
                </Flex>
              </Box>
            </GridItem>
          </Grid>
        </Layout>
      </Box>

      {/* <Img src="./svgs/wave3.svg" width="100%" /> */}
    </>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
