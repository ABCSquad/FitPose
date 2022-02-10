import { Grid, GridItem } from "@chakra-ui/react";
import React, { FC } from "react";
import Canvas from "./Canvas";

export const MainAppLayout: FC = () => {
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
				2
			</GridItem>
			<GridItem
				rowSpan={{ base: 1, md: 1, lg: 2 }}
				colSpan={{ base: 8, md: 8, lg: 6 }}
				bg="papayawhip"
			>
				3
			</GridItem>
		</Grid>
	);
};
