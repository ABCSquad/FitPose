import {
  Box,
  GridItem,
  Heading,
  Text,
  Img,
  Tag,
  HStack,
} from "@chakra-ui/react";
import { FC } from "react";

type ExerciseProps = {
  _id: string;
  name: string;
  difficulty: string;
  tags: string[];
  steps: string[];
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

const ExerciseCard: FC<ExerciseProps> = ({ name, difficulty, tags }) => {
  return (
    <GridItem colSpan={1} rowSpan={1}>
      <Box
        p={6}
        m={5}
        h={465}
        bg="white"
        rounded="lg"
        cursor="pointer"
        borderWidth={1}
        transition="transform .2s"
        _hover={{ transform: "scale(1.04)", boxShadow: "lg" }}
      >
        <Img
          src={`./svgs/exercises/${tags[0].toLowerCase()}.svg`}
          alt={tags[0]}
          h={250}
          mx="auto"
          p={6}
        />
        <Box m={4} postition="relative">
          <Heading fontSize="1.5rem">{name}</Heading>
          <Text my={2}>
            <b>Tags: </b>
            {tags.join(", ")}
          </Text>
          <HStack>
            <Tag
              mt="auto"
              size="lg"
              colorScheme={difficultyBadgeColor(difficulty)}
            >
              {difficulty}
            </Tag>
          </HStack>
        </Box>
      </Box>
    </GridItem>
  );
};

export default ExerciseCard;
