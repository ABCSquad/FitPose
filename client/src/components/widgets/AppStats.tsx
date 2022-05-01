import { Box, Grid, GridItem, HStack, Stack, Text } from "@chakra-ui/react";
import React, { FC } from "react";
import { useApp } from "../../contexts/AppContext";
import { AnimatePresence, motion } from "framer-motion";

const AppStats: FC = () => {
	const { FPS, repCounter } = useApp();

	const BoxStyles = {
		w: "100%",
		h: "100%",
		borderWidth: "1px",
		borderRadius: "30px",
		overflow: "hidden",
		bgGradient: "linear(to-l, #7928CA, #FF0080)",
		bgClip: "text",
		boxShadow: "lg",
		borderColor: "purple.200",
	};

	return (
		<Box
			mb={3}
			h="40%"
			w="100%"
			borderWidth="2px"
			borderRadius="30px"
			borderColor="InactiveBorder"
			bg="white"
			p={2}
		>
			<Grid
				h="100%"
				templateRows="repeat(12, 1fr)"
				templateColumns="repeat(12, 1fr)"
				gap={2}
			>
				{/* FPS MODULE */}
				<GridItem rowSpan={{ sm: 4, lg: 6 }} colSpan={{ sm: 12, lg: 6 }}>
					<Box {...BoxStyles}>
						<Stack
							direction={{ sm: "row", lg: "column" }}
							justifyContent="space-evenly"
							alignItems="center"
							p={5}
							h="100%"
						>
							<Text fontSize="6xl" fontWeight="extrabold" fontFamily="mono">
								{FPS ? Math.ceil(FPS) : 0}
							</Text>
							<Text>Webcam FPS</Text>
						</Stack>
					</Box>
				</GridItem>
				{/* MORE STATS */}
				<GridItem rowSpan={{ sm: 4, lg: 6 }} colSpan={{ sm: 12, lg: 6 }}>
					<Box {...BoxStyles}></Box>
				</GridItem>
				{/*  */}
				<GridItem rowSpan={6} colSpan={12}>
					<Box {...BoxStyles} bgGradient="linear(to-l, #7928CA, #FF0080)">
						<HStack justifyContent="space-evenly" alignItems="center" h="100%">
							<Text fontSize="5xl" fontWeight="extrabold" fontFamily="mono">
								REPS
							</Text>
							<Text fontWeight="extrabold" fontFamily="mono">
								<AnimatePresence>
									<motion.div
										key={repCounter ? repCounter : 0}
										initial={{ fontSize: "80px", opacity: 1 }}
										animate={{ fontSize: "80px" }}
										exit={{ fontSize: "0px", opacity: 0 }}
										transition={{ type: "spring", bounce: 0.2, duration: 0.2 }}
									>
										{repCounter ? repCounter : 0}
									</motion.div>
								</AnimatePresence>
							</Text>
						</HStack>
					</Box>
				</GridItem>
			</Grid>
		</Box>
	);
};

export default AppStats;
