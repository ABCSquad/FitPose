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
import { FC, useEffect, useState } from "react";
import { BiDumbbell } from "react-icons/bi";
import NavBar from "../../components/NavBar";
import Wrapper from "../../components/Wrapper";
import { useApp } from "../../contexts/AppContext";
import { InsertionData } from "../../core/types";
import createUrqlClient from "../../utils/createUrqlClient";

const Session: FC = () => {
  const { metaData, isIdeal } = useApp();
  const [exercises, setExercises] = useState<InsertionData>([]);
  useEffect(() => {
    if (
      metaData &&
      !isIdeal(metaData) &&
      metaData.insertionData &&
      metaData.insertionData.length > 0
    )
      setExercises(metaData.insertionData);
  }, [metaData]);

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
              <b>{`${exercises.length} exercises`}</b>
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
              <TabPanels px={40} py={4}>
                <TabPanel>
                  {exercises.map((x) => {
                    <Box mb={6}>
                      <Heading mb={1}>{`${x.name} exercises`}</Heading>
                      <HStack>
                        <Text fontSize={24} color="gray" mr="auto">
                          <b>Set 1</b>
                        </Text>
                        <Text fontSize={24} color="gray">
                          {`${x.sets.length - 1} reps`}
                        </Text>
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
