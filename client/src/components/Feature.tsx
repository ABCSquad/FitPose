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
      <Box
        p={{ base: 6, md: 10 }}
        m={6}
        h="90%"
        bg="white"
        boxShadow="md"
        rounded="xl"
      >
        <Circle bg="teal.500" size={{ base: "50px", md: 20 }} mb={4}>
          <Img src={`/svgs/features/${icon}.svg`} alt={icon} h="50%" />
        </Circle>
        <Text fontSize={{ base: "1.4rem", md: "1.8rem" }} mb={2}>
          <b>{heading}</b>
        </Text>
        <UnorderedList spacing={1} fontSize={{ md: "1.3rem" }} color="grey">
          {body.map((x, i) => (
            <ListItem key={i}>{x}</ListItem>
          ))}
        </UnorderedList>
      </Box>
    </GridItem>
  );
};

export default Feature;
