import { ArrowForwardIcon, ArrowRightIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Grid,
  GridItem,
  Heading,
  HStack,
  Icon,
  Img,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import { FC, useState } from "react";
import NavBar from "../../components/NavBar";
import Wrapper from "../../components/Wrapper";
import { useExerciseQuery } from "../../generated/graphql";
import createUrqlClient from "../../utils/createUrqlClient";

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

  //For modal
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [reps, setReps] = useState(10);
  const handleReps = (newReps: string) => {
    const newRepsNum = parseInt(newReps);
    if (!isNaN(newRepsNum)) setReps(newRepsNum);
  };

  return (
    <>
      <NavBar bg="brand.teal" />
      <Box bg="brand.lightgrey" minH="92vh" py={8}>
        <Wrapper>
          <Heading my={4} color="teal">
            {data?.exercise.name}
          </Heading>
          <Text my={4} fontSize="1.1rem">
            <b>Difficulty: </b>
            {data?.exercise.difficulty}
          </Text>
          <Button
            colorScheme="teal"
            size="lg"
            rightIcon={<ArrowForwardIcon />}
            onClick={onOpen}
          >
            Start Exercise
          </Button>
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
                mx={{ base: "auto", md: 4 }}
                mr="auto"
              />
            </GridItem>
            <GridItem colSpan={1} mb={2}>
              <Img
                src={data?.exercise.gif2}
                alt="Gif2"
                w="90%"
                rounded="lg"
                mx={{ base: "auto", md: 4 }}
                ml="auto"
              />
            </GridItem>
          </Grid>
          {data?.exercise.steps.map((step) => (
            <HStack bg="white" rounded="lg" borderWidth={1} p={3} mb={3}>
              <Icon as={ArrowRightIcon} color="teal" boxSize={5} mx={1} />
              <Text fontSize="1.3rem">{step}</Text>
            </HStack>
          ))}
        </Wrapper>
        <Modal onClose={onClose} isOpen={isOpen} isCentered>
          <ModalOverlay />
          <ModalContent bg="brand.lightgrey">
            <ModalHeader>Enter Maximum Reps</ModalHeader>
            <ModalBody>
              <NumberInput
                defaultValue={10}
                min={1}
                max={100}
                onChange={handleReps}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </ModalBody>
            <ModalFooter>
              <Button variant="outline" mr={3} onClick={onClose}>
                Close
              </Button>
              <Button
                colorScheme="teal"
                onClick={() => {
                  console.log(reps);
                }}
              >
                I'm Ready
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Exercise);
