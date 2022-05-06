import {
	Alert,
	AlertDescription,
	AlertIcon,
	AlertTitle,
	Flex,
	Grid,
	GridItem,
	Stack,
	Text,
} from "@chakra-ui/react";
import React from "react";
import { useApp } from "../contexts/AppContext";

type BlurProps = {
	noKeypoints?: boolean;
	isPause?: boolean;
	isStart?: boolean;
};

const BlurScreen = ({ noKeypoints, isPause, isStart }: BlurProps) => {
	const { metaData } = useApp();
	// console.log(metaData?.finalData);

	return (
		<div
			style={{
				backdropFilter: "blur(8px)",
				width: "100%",
				height: "100%",
				zIndex: 10000,
				top: 0,
				left: 0,
				position: "fixed",
			}}
		>
			<Grid
				h="100%"
				templateRows="repeat(12, 1fr)"
				templateColumns="repeat(12, 1fr)"
			>
				<GridItem rowSpan={6} colSpan={12} p={8}>
					<Flex direction="row" justifyContent="center" alignItems="center">
						<Text
							bgGradient="linear(to-l, #7928CA, #FF0080)"
							bgClip="text"
							fontWeight="bold"
							fontSize="8xl"
						>
							Exercise Name
							{/* {metaData ? metaData.finalData.currentExercise : ""} */}
						</Text>
					</Flex>
				</GridItem>
				{noKeypoints && (
					<GridItem rowSpan={6} colSpan={12}>
						<Flex
							direction="column"
							justifyContent="center"
							alignItems="center"
						>
							<Alert status="error" maxW="xl">
								<AlertIcon />

								<AlertDescription>
									<Text fontSize="2xl">
										User not visible. Please step in front of the camera.
									</Text>
								</AlertDescription>
							</Alert>
						</Flex>
					</GridItem>
				)}
			</Grid>
		</div>
	);
};

export default BlurScreen;
