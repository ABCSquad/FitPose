import { FC, MouseEvent } from "react";
import NextLink from "next/link";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import { Box, Text, Grid, GridItem, IconButton } from "@chakra-ui/react";
import {
  useAddExerciseMutation,
  useRemoveExerciseMutation,
} from "../generated/graphql";

type Props = {
  playlistId: string;
  _id: string;
  name: string;
  tags: string[];
  remove?: boolean;
};

const ExerciseListItem: FC<Props> = ({
  playlistId,
  _id,
  name,
  tags,
  remove,
}) => {
  const [, _addExercise] = useAddExerciseMutation();
  const addExercise = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const response = await _addExercise({
      input: { playlistId, exerciseId: _id },
    });
  };

  const [, _removeExercise] = useRemoveExerciseMutation();
  const removeExercise = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const response = await _removeExercise({
      input: { playlistId, exerciseId: _id },
    });
  };

  return (
    <NextLink
      href={"/exercises/[name]"}
      as={`/exercises/${name.toLowerCase().split(" ").join("-")}`}
    >
      <Box borderRadius="lg" w={800} p={2} mb={1} _hover={{ bg: "gray.100" }}>
        <Grid templateColumns="repeat(8, 1fr)">
          <GridItem colSpan={7}>
            <Text fontSize={18}>
              <b>{name}</b>
            </Text>
            <Text fontSize={16}>{tags.join(", ")}</Text>
          </GridItem>
          <GridItem colSpan={1} ml="auto">
            <IconButton
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
