import { Box, Button } from "@chakra-ui/react";
import React, { FC, useState } from "react";
import { HumanBody } from "./HumanBody";

const AppHuman: FC = () => {
	const [bodyState, setBodyState] = useState({
		head: {
			show: true,
			selected: false,
		},
		left_shoulder: {
			show: true,
			selected: false,
		},
		right_shoulder: {
			show: true,
			selected: false,
		},
		left_arm: {
			show: true,
			selected: false,
		},
		right_arm: {
			show: true,
			selected: false,
		},
		chest: {
			show: true,
			selected: false,
		},
		stomach: {
			show: true,
			selected: false,
		},
		left_leg: {
			show: true,
			selected: false,
		},
		right_leg: {
			show: true,
			selected: false,
		},
		left_hand: {
			show: true,
			selected: false,
		},
		right_hand: {
			show: true,
			selected: false,
		},
		left_foot: {
			show: true,
			selected: false,
		},
		right_foot: {
			show: true,
			selected: false,
		},
	});

	return (
		<Box
			mb={3}
			h="60%"
			w="100%"
			borderWidth="2px"
			borderRadius="30px"
			borderColor="InactiveBorder"
			bg="white"
		>
			<HumanBody partsInput={bodyState} />
			<Button
				onClick={() =>
					setBodyState((prev) => ({
						...prev,
						right_foot: {
							show: true,
							selected: !false,
						},
					}))
				}
			>
				Hello
			</Button>
		</Box>
	);
};

export default AppHuman;
