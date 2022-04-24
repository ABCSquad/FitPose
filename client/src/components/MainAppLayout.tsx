import { Center, Grid, GridItem, HStack, Text, VStack } from "@chakra-ui/react";
import React, { FC } from "react";
import Canvas from "./Canvas";
import { useApp } from "../contexts/AppContext";

export const MainAppLayout: FC = () => {
	const { blurState, repCounter, metaData, exercises } = useApp();
	console.log("App started with exercises: ", exercises);

	return (
		<Grid
			h="100vh"
			templateRows="repeat(6, 1fr)"
			templateColumns="repeat(8, 1fr)"
		>
			<GridItem
				rowSpan={{ base: 3, md: 3, lg: 5 }}
				colSpan={{ base: 8, md: 8, lg: 6 }}
			>
				<Canvas />
			</GridItem>
			<GridItem
				rowSpan={{ base: 2, md: 2, lg: 6 }}
				colSpan={{ base: 8, md: 8, lg: 2 }}
				bg="blue.100"
			>
				<Center>
					<VStack>
						{blurState ? (
							<Text fontSize="3xl" color="red.400">
								NO KEYPOINTS DETECTED
							</Text>
						) : (
							<Text fontSize="3xl" color="green.400">
								KEYPOINTS DETECTED
							</Text>
						)}
						<Text fontSize="4xl" color="orange.400">
							REPS:
						</Text>
						<Text fontSize="8xl" color="black">
							{repCounter}
						</Text>
						<HStack>
							{" "}
							<Text fontSize="md" color="black">
								Shoulder:{" "}
								{metaData && metaData.deviationObj
									? Math.round(metaData.deviationObj.shoulder)
									: null}{" "}
								°
							</Text>
							<Text fontSize="md" color="black">
								Elbow(r):{" "}
								{metaData && metaData.deviationObj
									? Math.round(metaData.deviationObj.leftElbow)
									: null}{" "}
								°
							</Text>
							<Text fontSize="md" color="black">
								Elbow(l):{" "}
								{metaData && metaData.deviationObj
									? Math.round(metaData.deviationObj.rightElbow)
									: null}{" "}
								°
							</Text>
						</HStack>
					</VStack>
				</Center>
			</GridItem>
			<GridItem
				rowSpan={{ base: 1, md: 1, lg: 2 }}
				colSpan={{ base: 8, md: 8, lg: 6 }}
				bg="papayawhip"
			>
				{" "}
				<Center mt="3">
					<Text fontSize="6xl" color="black">
						{metaData && metaData.message
							? metaData.message.toUpperCase()
							: null}
					</Text>
				</Center>
			</GridItem>
		</Grid>
	);
};
