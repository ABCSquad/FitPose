import {
  Box,
  Circle,
  GridItem,
  Img,
  ListItem,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import { FC } from "react";

type FeatureProps = {
  icon: string;
  heading: string;
  body: string[];
};

const Feature: FC<FeatureProps> = ({ icon, heading, body }) => {
  return (
    <GridItem colSpan={1} rowSpan={1}>
      <Box p={10} m={5} h="90%" bg="white" boxShadow="md" rounded="xl">
        <Circle bg="teal.500" size="80px" mb={4}>
          <Img src={`./svgs/${icon}.svg`} h="50%" />
        </Circle>
        <Text fontSize="2rem" mb={2}>
          <b>{heading}</b>
        </Text>
        <UnorderedList spacing={1}>
          {body.map((x) => (
            <ListItem fontSize="1.5rem" color="grey">
              {x}
            </ListItem>
          ))}
        </UnorderedList>
      </Box>
    </GridItem>
  );
};

export default Feature;
