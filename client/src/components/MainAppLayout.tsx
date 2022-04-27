import { Center, Grid, GridItem, HStack, Text, VStack } from "@chakra-ui/react";
import React, { FC } from "react";
import Canvas from "./Canvas";
import { useApp } from "../contexts/AppContext";
export const MainAppLayout: FC = () => {
	// const { blurState, repCounter, metaData, exercises } = useApp();

	return (
		<>
			<Canvas />
			<Grid
				h="100vh"
				templateRows="repeat(6, 1fr)"
				templateColumns="repeat(8, 1fr)"
			></Grid>
		</>
	);
};
