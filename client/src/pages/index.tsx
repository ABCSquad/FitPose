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
  useBreakpointValue,
} from "@chakra-ui/react";
import { useEffect } from "react";
import Wrapper from "../components/Wrapper";
import { withUrqlClient } from "next-urql";
import createUrqlClient from "../utils/createUrqlClient";
import Feature from "../components/Feature";
import Footer from "../components/Footer";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import NavBar from "../components/NavBar";
import { useMeQuery } from "../generated/graphql";

const Index = () => {
  const [{ data }] = useMeQuery();

  useEffect(() => {
    import("@lottiefiles/lottie-player");
  }, []);

  const headingFont = {
    fontSize: { base: "4rem", md: "6.3rem" },
  };
  const textAlign = {
    textAlign: { base: "center" as const, md: "left" as const },
  };
  const buttonSize = useBreakpointValue({ base: "md", md: "lg" });

  return (
    <>
      <NavBar bg="brand.teal" />

      {/* Landing segment */}
      <Box minH="92vh" bg="brand.teal">
        <Wrapper>
          <Grid
            templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(3, 1fr)" }}
          >
            <GridItem colSpan={1}>
              <Flex align="center" h="100%">
                <Box>
                  <Heading
                    {...headingFont}
                    {...textAlign}
                    mt={{ base: 20, md: 5 }}
                  >
                    Train.
                  </Heading>
                  <Heading {...textAlign} {...headingFont}>
                    Reflect.
                  </Heading>
                  <Heading
                    {...headingFont}
                    {...textAlign}
                    color="pink.400"
                    mb={{ md: 5 }}
                  >
                    Master.
                  </Heading>
                  <Text
                    {...textAlign}
                    fontSize={{ md: "1.35rem" }}
                    my={{ md: 5 }}
                  >
                    FitPose uses AI to guide you in your workouts so that you
                    can achieve your fitness goals.
                  </Text>
                  <Flex>
                    <NextLink href="/exercises">
                      <Button
                        colorScheme="teal"
                        size="lg"
                        my={{ base: 4, md: 5 }}
                        mx={{ base: "auto", md: 0 }}
                        rightIcon={<ArrowForwardIcon />}
                      >
                        Get Started For Free
                      </Button>
                    </NextLink>
                  </Flex>
                </Box>
              </Flex>
            </GridItem>
            <GridItem colSpan={2}>
              <Flex align="center">
                <Box h={{ base: "300px", md: "840px" }} mx="auto">
                  <Img
                    src="./svgs/blobs.svg"
                    alt="blobs"
                    position="absolute"
                    h={{ base: "240px", md: "auto" }}
                  />
                  <lottie-player
                    autoplay
                    loop
                    mode="normal"
                    src="./lotties/runner.json"
                    style={{ height: "100%" }}
                  ></lottie-player>
                </Box>
              </Flex>
            </GridItem>
          </Grid>
        </Wrapper>
      </Box>

      <Img src="./svgs/waves/wave1.svg" alt="wave" width="100%" />

      {/* Features segment */}
      <Flex
        minH="100vh"
        bg="brand.lightgrey"
        align="center"
        py={{ base: 10, md: 0 }}
      >
        <Wrapper>
          <Heading
            fontSize={{ base: "2.2rem", md: "3.9rem" }}
            {...textAlign}
            mb={2}
          >
            Push your fitness game to the next level.
          </Heading>
          <Text fontSize={{ md: "1.25rem" }} {...textAlign} mb={4} color="grey">
            The power of AI comes with great responsibility. We aren't looking
            to deploy some terminator; we are just attempting to take care of
            you!
          </Text>
          <Grid
            templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }}
            templateRows={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }}
            mx={-6}
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
        </Wrapper>
      </Flex>

      <Img src="./svgs/waves/wave2.svg" alt="wave" width="100%" />

      {/* Signup segment */}
      <Box bg="brand.lightpink" pb={{ base: 10, md: 0 }}>
        <Wrapper>
          <Grid
            templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(5, 1fr)" }}
          >
            <GridItem colSpan={2} p={10}>
              <lottie-player
                autoplay
                loop
                mode="normal"
                src="./lotties/login.json"
              ></lottie-player>
            </GridItem>
            <GridItem colSpan={3} py={{ md: 20 }} px={{ md: 10 }}>
              <Flex align="center" h="100%">
                <Box>
                  <Heading
                    {...textAlign}
                    fontSize={{ base: "1.8rem", md: "2.5rem" }}
                  >
                    {data?.me
                      ? "Membership benefits that you have availed~"
                      : "Sign up for free to get additional benefits."}
                  </Heading>
                  <UnorderedList
                    spacing={4}
                    my={6}
                    fontSize={{ md: "1.2rem" }}
                    color="brand.darkgrey"
                  >
                    <ListItem>
                      User created custom playlists to easily access your
                      frequented exercises.
                    </ListItem>
                    <ListItem>
                      Access to all past workouts to review any session.
                    </ListItem>
                    <ListItem>
                      Over-the-time progress feedback to see how far you've
                      come!
                    </ListItem>
                  </UnorderedList>
                  <Flex align="center">
                    <NextLink href={data?.me ? "/playlists" : "/signup"}>
                      <Button
                        colorScheme="pink"
                        size={buttonSize}
                        ml={{ base: "auto", md: 0 }}
                      >
                        {data?.me ? "View Playlists" : "Sign Up For Free"}
                      </Button>
                    </NextLink>
                    <Text
                      mx={{ base: 2, md: 5 }}
                      fontSize={{ base: "0.7rem", md: "1rem" }}
                    >
                      or
                    </Text>
                    <NextLink href={data?.me ? "/dashboard" : "/exercises"}>
                      <Button
                        colorScheme="gray"
                        size={buttonSize}
                        mr={{ base: "auto", md: 0 }}
                        ml={{ base: "auto", md: 0 }}
                      >
                        {data?.me ? "Go To Dashboard" : "Get Started Anyway"}
                      </Button>
                    </NextLink>
                  </Flex>
                </Box>
              </Flex>
            </GridItem>
          </Grid>
        </Wrapper>
      </Box>

      <Img src="./svgs/waves/wave3.svg" alt="wave" width="100%" />

      <Footer />
    </>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);