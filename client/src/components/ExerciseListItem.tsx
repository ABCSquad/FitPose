import { FC, MouseEvent } from "react";
import NextLink from "next/link";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import {
  Box,
  Text,
  Grid,
  GridItem,
  IconButton,
  Tag,
  Center,
  HStack,
  Stack,
} from "@chakra-ui/react";
import {
  useAddExerciseMutation,
  useRemoveExerciseMutation,
} from "../generated/graphql";

type Props = {
  listId?: number;
  playlistId: string;
  _id: string;
  name: string;
  difficulty: string;
  tags: string[];
  remove?: boolean;
};

const difficultyBadgeColor = (difficulty: string) => {
  switch (difficulty) {
    case "Advanced":
      return "red";
    case "Intermediate":
      return "yellow";
    default:
      return "green";
  }
};

const ExerciseListItem: FC<Props> = ({
  listId,
  playlistId,
  _id,
  name,
  difficulty,
  tags,
  remove,
}) => {
  const [, _addExercise] = useAddExerciseMutation();
  const addExercise = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await _addExercise({
      input: { playlistId, exerciseId: _id },
    });
  };

  const [, _removeExercise] = useRemoveExerciseMutation();
  const removeExercise = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await _removeExercise({
      input: { playlistId, exerciseId: _id },
    });
  };

  return (
    <NextLink
      href={"/exercises/[name]"}
      as={`/exercises/${name.toLowerCase().split(" ").join("-")}`}
    >
      <Box
        borderRadius="lg"
        p={2}
        mb={1}
        cursor="default"
        _hover={{ bg: "gray.100" }}
      >
        <Grid
          templateColumns={{ base: "repeat(6, 1fr)", md: "repeat(8, 1fr)" }}
        >
          <GridItem colSpan={{ base: 3, md: 4 }}>
            <HStack>
              {listId && (
                <Text fontSize={34} mr={4}>
                  {`${listId}.`}
                </Text>
              )}
              <Stack spacing={0}>
                <Text fontSize={18}>
                  <b>{name}</b>
                </Text>
                <Text fontSize={16}>{tags.join(", ")}</Text>
              </Stack>
            </HStack>
          </GridItem>
          <GridItem colSpan={{ base: 2, md: 1 }}>
            <Center>
              <Tag
                size="lg"
                my={2}
                colorScheme={difficultyBadgeColor(difficulty)}
              >
                {difficulty}
              </Tag>
            </Center>
          </GridItem>
          <GridItem colSpan={{ base: 1, md: 3 }} ml="auto">
            <IconButton
              variant="outline"
              borderRadius="50%"
              size="sm"
              my={2}
              colorScheme={remove ? "red" : "teal"}
              aria-label="Add Exercise"
              icon={remove ? <MinusIcon /> : <AddIcon />}
              onClick={remove ? removeExercise : addExercise}
            />
          </GridItem>
        </Grid>
      </Box>
    </NextLink>
  );
};

export default ExerciseListItem;
