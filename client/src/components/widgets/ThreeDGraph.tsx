import { Box, Center } from "@chakra-ui/react";
import React, { FC } from "react";

const ThreeDGraph: FC = () => {
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
			<Center>3 to the D</Center>
		</Box>
	);
};

export default ThreeDGraph;
