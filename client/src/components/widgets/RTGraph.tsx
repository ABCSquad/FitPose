import { Box } from "@chakra-ui/react";
import React, { FC, useEffect, useState } from "react";
import { LineChart, Line, ResponsiveContainer, YAxis } from "recharts";
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
	const [repMode, setRepMode] = useState(false);

	const setData = () => {
		const compound = metaData?.compoundData;
		const final = metaData?.finalData;
		const getMin = compound!.repsData.range[0];
		const getMax = compound!.repsData.range[1];
		const currentAngle = compound?.angleData[compound.repsData.partName];
		const percentage = ((currentAngle! - getMin) / (getMax - getMin)) * 100;
		console.log(Math.round(percentage!));

		const returnObj = {
			amt: Math.round(percentage!),
		};

		setGraphData([...graphData, returnObj]);
		removeOldData();
	};

	const removeOldData = () => {
		if (graphData.length >= 50) {
			const array = [...graphData];
			array.shift();
			setGraphData(array);
		}
	};

	useEffect(() => {
		console
			.log
			// 	metaData?.compoundData?.repsData.range[0],
			// 	metaData?.compoundData?.repsData.range[1]
			();

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
					<LineChart
						data={graphData}
						margin={{
							top: 25,
							right: 25,
							left: 5,
							bottom: 5,
						}}
					>
						{/* <Tooltip /> */}
						<YAxis hide domain={[0, 100]} allowDataOverflow={true} />
						<Line type="monotone" dataKey="amt" stroke="#82ca9d" />
					</LineChart>
				</ResponsiveContainer>
			</div>
		</Box>
	);
};

export default RTGraph;
