import { TimeIcon } from "@chakra-ui/icons";
import { BiDumbbell } from "react-icons/bi";
import { Icon } from "@chakra-ui/react";
import {
  Box,
  Heading,
  HStack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import { FC } from "react";
import NavBar from "../../components/NavBar";
import Wrapper from "../../components/Wrapper";
import createUrqlClient from "../../utils/createUrqlClient";

const Session: FC = () => {
  return (
    <>
      <NavBar bg="brand.teal" />
      <Box bg="brand.lightgrey" minH="92vh" py={8}>
        <Wrapper>
          <Heading color="teal" fontSize={50} mt={4} mb={1}>
            My Workout #1
          </Heading>
          <Text fontSize={20} mb={4}>
            Thursday, 5 May 2022, 18:51
          </Text>
          <HStack mb={8}>
            <Icon as={BiDumbbell} boxSize={6} />
            <Text fontSize={20}>
              <b>5 exercises</b>
            </Text>
            <TimeIcon boxSize={5} />
            <Text fontSize={20}>
              <b>31m</b>
            </Text>
          </HStack>
          <Box bg="white" py={5} px={8} rounded="xl" borderWidth={1}>
            <Tabs isFitted colorScheme="teal">
              <TabList mb="1em">
                <Tab
                  fontSize={20}
                  _active={{ bg: "inherit" }}
                  _focus={{ boxShadow: "none" }}
                >
                  <b>Summary</b>
                </Tab>
                <Tab
                  fontSize={20}
                  _active={{ bg: "inherit" }}
                  _focus={{ boxShadow: "none" }}
                >
                  <b>Visualization</b>
                </Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <Box mb={3}>
                    <Heading fontSize={20}>Bicep Curl</Heading>
                    <HStack>
                      <Text mr="auto">
                        <b>Set 1</b>
                      </Text>
                      <Text>10 reps</Text>
                    </HStack>
                    <HStack>
                      <Text mr="auto">
                        <b>Set 2</b>
                      </Text>
                      <Text>10 reps</Text>
                    </HStack>
                    <HStack>
                      <Text mr="auto">
                        <b>Set 3</b>
                      </Text>
                      <Text>10 reps</Text>
                    </HStack>
                  </Box>
                </TabPanel>
                <TabPanel>
                  <p>two!</p>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
        </Wrapper>
      </Box>
    </>
  );
};

export default withUrqlClient(createUrqlClient)(Session);
