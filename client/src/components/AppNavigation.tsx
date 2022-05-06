import { Box, Button, Flex, IconButton } from "@chakra-ui/react";
import React, { FC, useState } from "react";
import { VscDebugStart } from "react-icons/vsc";
import { VscDebugPause } from "react-icons/vsc";
import { useApp } from "../contexts/AppContext";

const AppNavigation: FC = () => {
  const [isPause, setIsPause] = useState(false);
  const { appNavigationStop, appNavigationNext } = useApp();

  const handleStop = () => {
    console.log("isStopped");
    appNavigationStop();
  };

  const handleNext = () => {
    appNavigationNext();
  };

  return (
    <Box
      p={4}
      h="70px"
      w={{ base: "60vw", sm: "50vw", md: "40vw", lg: "30vw" }}
      borderWidth="0px"
      borderRadius="10px"
      borderColor="InactiveBorder"
      bg="whiteAlpha.200"
    >
      <Flex direction="row" justifyContent="center" alignItems="center">
        <Button
          w="80px"
          colorScheme="red"
          variant="solid"
          mr={4}
          onClick={handleStop}
        >
          Stop
        </Button>
        <IconButton
          mr={4}
          aria-label="Pause "
          icon={isPause ? <VscDebugPause /> : <VscDebugStart />}
          onClick={() => {
            setIsPause(!isPause);
          }}
        />
        <Button
          w="80px"
          variant="solid"
          colorScheme="teal"
          onClick={handleNext}
        >
          Next
        </Button>
      </Flex>
    </Box>
  );
};

export default AppNavigation;
