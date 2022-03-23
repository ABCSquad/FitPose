import { Box, GridItem } from "@chakra-ui/react";
import { FC } from "react";

const ExerciseCard: FC = () => {
  return (
    <GridItem colSpan={1} rowSpan={1}>
      <Box
        p={{ base: 6, md: 10 }}
        m={6}
        h="90%"
        bg="white"
        boxShadow="md"
        rounded="xl"
      ></Box>
    </GridItem>
  );
};

export default ExerciseCard;
