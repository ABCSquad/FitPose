import { Box, Center } from "@chakra-ui/react";
import React, { FC, useEffect, useRef } from "react";
import { LandmarkGrid } from "@mediapipe/control_utils_3d";
import { useApp } from "../../contexts/AppContext";
import {
  POSE_CONNECTIONS,
  POSE_LANDMARKS_LEFT,
  POSE_LANDMARKS_RIGHT,
} from "@mediapipe/pose";

const ThreeDGraph: FC = () => {
  const { landmarks } = useApp();
  const landmarkRef = useRef<HTMLDivElement | null>(null);

  const grid = new LandmarkGrid(landmarkRef.current!, {
    connectionColor: 0xcccccc,
    definedColors: [
      { name: "LEFT", value: 0xffa500 },
      { name: "RIGHT", value: 0x00ffff },
    ],
    range: 2,
    fitToGrid: true,
    labelSuffix: "m",
    landmarkSize: 2,
    numCellsPerAxis: 4,
    showHidden: false,
    centered: true,
  });

  const updateGrid = () => {
    if (landmarks) {
      grid.updateLandmarks(landmarks, POSE_CONNECTIONS, [
        { list: Object.values(POSE_LANDMARKS_LEFT), color: "LEFT" },
        { list: Object.values(POSE_LANDMARKS_RIGHT), color: "RIGHT" },
      ]);
    } else {
      grid.updateLandmarks([]);
    }
  };

  useEffect(updateGrid, [landmarks]);

  return (
    <Box
      mb={3}
      h="100%"
      w="100%"
      borderWidth="2px"
      borderRadius="30px"
      borderColor="InactiveBorder"
      bg="white"
    >
      <Center>
        <div ref={landmarkRef} className="landmark-grid-container"></div>
      </Center>
    </Box>
  );
};

export default ThreeDGraph;
