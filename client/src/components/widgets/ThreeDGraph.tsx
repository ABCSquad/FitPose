import { Box, Center } from "@chakra-ui/react";
import React, { FC, useEffect, useRef, useState } from "react";
import { useApp } from "../../contexts/AppContext";
import { ForceGraph3D } from "react-force-graph";
import { ForceData } from "../../core/types";
import { POSE_CONNECTIONS } from "@mediapipe/pose";

const ThreeDGraph: FC = () => {
  //   let poseConnections: Array<any> = POSE_CONNECTIONS;
  //   let newArr = poseConnections.map((ele) => {
  //     return { source: ele[0], target: ele[1] };
  //   });
  //   console.log(newArr);
  const LINKS = [
    {
      source: 0,
      target: 1,
    },
    {
      source: 1,
      target: 2,
    },
    {
      source: 2,
      target: 3,
    },
    {
      source: 3,
      target: 7,
    },
    {
      source: 0,
      target: 4,
    },
    {
      source: 4,
      target: 5,
    },
    {
      source: 5,
      target: 6,
    },
    {
      source: 6,
      target: 8,
    },
    {
      source: 9,
      target: 10,
    },
    {
      source: 11,
      target: 12,
    },
    {
      source: 11,
      target: 13,
    },
    {
      source: 13,
      target: 15,
    },
    {
      source: 15,
      target: 17,
    },
    {
      source: 15,
      target: 19,
    },
    {
      source: 15,
      target: 21,
    },
    {
      source: 17,
      target: 19,
    },
    {
      source: 12,
      target: 14,
    },
    {
      source: 14,
      target: 16,
    },
    {
      source: 16,
      target: 18,
    },
    {
      source: 16,
      target: 20,
    },
    {
      source: 16,
      target: 22,
    },
    {
      source: 18,
      target: 20,
    },
    {
      source: 11,
      target: 23,
    },
    {
      source: 12,
      target: 24,
    },
    {
      source: 23,
      target: 24,
    },
    {
      source: 23,
      target: 25,
    },
    {
      source: 24,
      target: 26,
    },
    {
      source: 25,
      target: 27,
    },
    {
      source: 26,
      target: 28,
    },
    {
      source: 27,
      target: 29,
    },
    {
      source: 28,
      target: 30,
    },
    {
      source: 29,
      target: 31,
    },
    {
      source: 30,
      target: 32,
    },
    {
      source: 27,
      target: 31,
    },
    {
      source: 28,
      target: 32,
    },
  ];

  const { landmarks } = useApp();
  const landmarkRef = useRef<HTMLDivElement | null>(null);
  const [forceData, setForceData] = useState<ForceData>({
    nodes: [],
    links: [],
  });

  useEffect(() => {
    let tempLandmarks: any = [...landmarks];
    tempLandmarks.forEach((ele: any, index: number) => {
      delete ele.visibility;
      ele.id = index;
    });

    setForceData({
      nodes: tempLandmarks,
      links: LINKS,
    });
  }, [landmarks]);

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
        <ForceGraph3D graphData={forceData} />
      </Center>
    </Box>
  );
};

export default ThreeDGraph;
