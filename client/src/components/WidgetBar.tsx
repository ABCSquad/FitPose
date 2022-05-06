import { Flex } from "@chakra-ui/react";
import React from "react";
import RTGraph from "./widgets/RTGraph";
import ThreeDGraph from "./widgets/ForceGraph/ThreeDGraph";

const WidgetBar = () => {
  return (
    <div>
      <div>
        <Flex
          pos="sticky"
          right={5}
          m={2}
          h="95vh"
          marginTop="2.5vh"
          boxShadow="0 4px 12px 0 rgba(0,0,0,0,05)"
          borderRadius="30px"
          flexDir="column"
          justifyContent="space-evenly"
          bg="whiteAlpha.200"
          p={3}
        >
          <RTGraph />
          <ThreeDGraph />
        </Flex>
      </div>
    </div>
  );
};

export default WidgetBar;
