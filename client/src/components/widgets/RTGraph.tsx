import { Box } from "@chakra-ui/react";
import React, { FC } from "react";
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
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

	

	const setData = () => {};

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
						data={data}
						margin={{
							top: 25,
							right: 25,
							left: 5,
							bottom: 5,
						}}
					>
						<Tooltip />
						<Line
							type="monotone"
							dataKey="pv"
							stroke="#8884d8"
							activeDot={{ r: 8 }}
						/>
						<Line type="monotone" dataKey="uv" stroke="#82ca9d" />
					</LineChart>
				</ResponsiveContainer>
			</div>
		</Box>
	);
};

export default RTGraph;
