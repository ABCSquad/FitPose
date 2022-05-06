import { Box } from "@chakra-ui/react";
import React, { FC, useEffect, useState } from "react";
import { HumanBody } from "./HumanBody";
import { useApp } from "../../../contexts/AppContext";
import { DeviatingPart } from "../../../core/types";

const AppHuman: FC = () => {
  const PARTS = {
    head: {
      show: true,
      selected: false,
    },
    left_shoulder: {
      show: true,
      selected: false,
    },
    right_shoulder: {
      show: true,
      selected: false,
    },
    left_arm: {
      show: true,
      selected: false,
    },
    right_arm: {
      show: true,
      selected: false,
    },
    chest: {
      show: true,
      selected: false,
    },
    stomach: {
      show: true,
      selected: false,
    },
    left_leg: {
      show: true,
      selected: false,
    },
    right_leg: {
      show: true,
      selected: false,
    },
    left_hand: {
      show: true,
      selected: false,
    },
    right_hand: {
      show: true,
      selected: false,
    },
    left_foot: {
      show: true,
      selected: false,
    },
    right_foot: {
      show: true,
      selected: false,
    },
  };

  const { metaData, isIdeal } = useApp();
  const [bodyState, setBodyState] =
    useState<Record<string, Record<string, boolean>>>(PARTS);

  const CUSTOM_PART_MAP: Record<string, Array<string>> = {
    leftElbow: ["left_hand", "left_arm"],
    rightElbow: ["right_hand", "right_arm"],
    leftShoulder: ["left_shoulder"],
    rightShoulder: ["right_shoulder"],
    shoulders: ["left_shoulder", "right_shoulder"],
    shoulder: ["left_shoulder", "right_shoulder"],
    elbows: ["left_hand", "left_arm", "right_hand", "right_arm"],
  };

  const selectBodyPart = () => {
    let tempBodyState: Record<string, Record<string, boolean>> = Object.assign(
      {},
      PARTS
    );
    let tempCustomMap = Object.assign({}, CUSTOM_PART_MAP);
    if (metaData && isIdeal(metaData)) {
      let tempMetaData = [...metaData.finalData.deviatingPartArray];
      tempMetaData.forEach((e: DeviatingPart) => {
        tempCustomMap[e.partName].forEach((e) => {
          tempBodyState[e].selected = true;
        });
      });
      setBodyState(tempBodyState);
    }
  };

  useEffect(() => {
    console.log();
    selectBodyPart();
  }, [metaData]);

  return (
    <Box
      mb={3}
      h="60%"
      w="100%"
      borderWidth="2px"
      borderRadius="30px"
      borderColor="InactiveBorder"
      bg="white"
    >
      <HumanBody partsInput={bodyState} />
    </Box>
  );
};

export default AppHuman;
