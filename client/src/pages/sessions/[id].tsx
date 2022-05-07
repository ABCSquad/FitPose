import { TimeIcon } from "@chakra-ui/icons";
import {
  Box,
  Heading,
  HStack,
  Icon,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import { FC } from "react";
import { BiDumbbell } from "react-icons/bi";
import NavBar from "../../components/NavBar";
import Wrapper from "../../components/Wrapper";
import { useApp } from "../../contexts/AppContext";
import createUrqlClient from "../../utils/createUrqlClient";

const Session: FC = () => {
  const { insertionData } = useApp();
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
              <b>{insertionData.length}</b>
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
              <TabPanels px={40} py={6}>
                <TabPanel>
                  {insertionData.map((x) => {
                    <Box mb={4}>
                      <Heading ontSize={30} mb={1}>
                        {x.name}
                      </Heading>
                      <HStack>
                        <Text fontSize={22} mr="auto">
                          <b>Set 1</b>
                        </Text>
                        <Text fontSize={22}>{x.sets.length - 1}</Text>
                      </HStack>
                    </Box>;
                  })}
                </TabPanel>
                <TabPanel py={4}>
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
