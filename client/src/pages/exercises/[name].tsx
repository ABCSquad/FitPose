import {
  Box,
  Heading,
  Img,
  Text,
  Grid,
  GridItem,
  Icon,
  HStack,
} from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import { FC } from "react";
import NavBar from "../../components/NavBar";
import Wrapper from "../../components/Wrapper";
import { useExerciseQuery } from "../../generated/graphql";
import createUrqlClient from "../../utils/createUrqlClient";
import { CheckCircleIcon, ArrowRightIcon } from "@chakra-ui/icons";

const Exercise: FC = () => {
  const router = useRouter();

  //Getting exercise from url
  const exerciseName =
    typeof router.query.name === "string"
      ? router.query.name
          //Since exercise name in snake-case in url but in Title Case in database
          .split("-")
          .map((x) => x.charAt(0).toUpperCase() + x.slice(1))
          .join(" ")
      : "";
  const [{ data }] = useExerciseQuery({ variables: { name: exerciseName } });

  return (
    <>
      <NavBar bg="brand.teal" />
      <Box bg="brand.lightgrey" minH="92vh" pt={8}>
        <Wrapper>
          <Heading my={4} color="teal">
            {data?.exercise.name}
          </Heading>
          <Text my={4} fontSize="1.1rem">
            <b>Difficulty: </b>
            {data?.exercise.difficulty}
          </Text>
          <Grid
            my={10}
            templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }}
          >
            <GridItem colSpan={1} mb={2}>
              <Img
                src={data?.exercise.gif1}
                alt="Gif1"
                w="90%"
                rounded="lg"
                mx={{ base: "auto", md: 6 }}
                mr="auto"
              />
            </GridItem>
            <GridItem colSpan={1} mb={2}>
              <Img
                src={data?.exercise.gif2}
                alt="Gif2"
                w="90%"
                rounded="lg"
                mx={{ base: "auto", md: 6 }}
                ml="auto"
              />
            </GridItem>
          </Grid>
          {data?.exercise.steps.map((step) => (
            <HStack bg="white" rounded="lg" borderWidth={1} p={3} mb={3}>
              <Icon as={CheckCircleIcon} color="teal" boxSize={6} mx={1} />
              <Text fontSize="1.3rem">{step}</Text>
            </HStack>
          ))}
        </Wrapper>
      </Box>
    </>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Exercise);
