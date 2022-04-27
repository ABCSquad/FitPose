import { Box, Flex } from "@chakra-ui/react";
import React, { FC } from "react";
import { useApp } from "../../contexts/AppContext";

const AppStats: FC = () => {
	const { FPS } = useApp();

	return (
		<Box
			mb={3}
			h="40%"
			w="100%"
			borderWidth="2px"
			borderRadius="30px"
			borderColor="InactiveBorder"
			bg="white"
		>
			<Flex dir="row" justify="center" alignContent="center">
				BIG BOI FRAMES{FPS != 0 ? ` ${FPS.toPrecision(2)}` : null}
			</Flex>
		</Box>
	);
};

export default AppStats;
