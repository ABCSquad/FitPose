import { Flex } from "@chakra-ui/react";
import React from "react";

const WidgetBar = () => {
	return (
		<div>
			<div>
				<Flex
					pos="sticky"
					right={5}
					m={2}
					h="95vh"
					marginTop="2.5vh"
					boxShadow="0 4px 12px 0 rgba(0,0,0,0,05)"
					borderRadius="30px"
					dir="column"
					justifyContent="space-between"
					bg="red.200"
				></Flex>
			</div>
		</div>
	);
};

export default WidgetBar;
