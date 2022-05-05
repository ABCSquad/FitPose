import { Box } from "@chakra-ui/react";
import React, { FC, useEffect, useState } from "react";
import {
  LineChart,
  Line,
  ResponsiveContainer,
  YAxis,
  Area,
  Tooltip,
  ComposedChart,
} from "recharts";
import { useApp } from "../../contexts/AppContext";

const data = [
  {
    name: "A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: " B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: " C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: " D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: " E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: " F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: " G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const RTGraph: FC = () => {
  const { metaData } = useApp();
  const [graphData, setGraphData] = useState<Array<object>>([]);
  const [graphMeta, setGraphMeta] = useState(false);

  const setData = () => {
    const compound = metaData?.compoundData;
    const final = metaData?.finalData;
    // const getMin = compound?.repsData.range[0];
    // const getMax = compound?.repsData.range[1];
    const currentAngle =
      metaData?.compoundData?.angleData[metaData.finalData.currentExercise][
        metaData.compoundData.repsData[metaData.finalData.currentExercise]
          .partName
      ];

    // const returnObj = {
    // 	amt: Math.round(currentAngle ? currentAngle : 0),
    // };
    if (final?.repCount !== -1) {
      let deviation: number;
      if (final?.deviatingPart === "") {
        deviation = 0;
      } else {
        deviation = 0.5 * 360;
      }
      if (final?.repFlag === true) {
        setGraphData([
          ...graphData,
          { amt: 360, dev: deviation, curr: currentAngle },
        ]);
      } else {
        setGraphData([
          ...graphData,
          { amt: 0, dev: deviation, curr: currentAngle },
        ]);
      }
    } else {
      // console.log("true");
      setGraphMeta(true);
    }
    removeOldData();
  };

  const removeOldData = () => {
    if (graphData.length > 150) {
      const array = [...graphData];
      for (let i = 0; i < 50; i++) {
        array.shift();
      }

      setGraphData(array);
    }
  };

  useEffect(() => {
    setData();
  }, [metaData]);

  useEffect(() => {
    // console.log(metaData);

    setData();
  }, [metaData]);

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
      <div
        className="RT-graph"
        style={{ width: "100%", height: "100%", padding: "10px" }}
      >
        <ResponsiveContainer>
          <ComposedChart
            data={graphData}
            margin={{
              top: 25,
              right: 25,
              left: 5,
              bottom: 5,
            }}
          >
            {/* <Tooltip /> */}
            <YAxis hide domain={[0, 1]} />
            <Line
              type="monotone"
              dataKey="curr"
              stroke="#8884d8"
              strokeWidth={1}
              opacity={0.4}
            />
            <Line
              type="monotone"
              dataKey="amt"
              stroke="#8884d8"
              strokeWidth={2}
            />
            <Line type="monotone" dataKey="dev" stroke="red" strokeWidth={2} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </Box>
  );
};

export default RTGraph;
