import { Box, GridItem } from "@chakra-ui/react";
import { FC } from "react";

type ExerciseProps = {
  _id: string;
  name: string;
  difficulty: string;
  tags: string[];
  steps: string[];
};

const ExerciseCard: FC<ExerciseProps> = ({ name, difficulty }) => {
  return (
    <GridItem colSpan={1} rowSpan={1}>
      <Box
        p={{ base: 6, md: 10 }}
        m={6}
        h="80%"
        bg="white"
        boxShadow="md"
        rounded="xl"
      >
        <h1>{name}</h1>
        <h2>{difficulty}</h2>
      </Box>
    </GridItem>
  );
};

export default ExerciseCard;
