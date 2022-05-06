import { Box, Button } from "@chakra-ui/react";
import React, { FC, useEffect, useState } from "react";
import { HumanBody } from "./HumanBody";
import { useApp } from "../../../contexts/AppContext";

const AppHuman: FC = () => {
	const { metaData, isIdeal } = useApp();

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

	const selectBodyPart = () => {
		setBodyState((prev) => ({
			...prev,
			left_foot: {
				show: true,
				selected: false,
			},
		}));
	};

	useEffect(() => {
		console.log(
			isIdeal(metaData) ? metaData.finalData.deviatingPartArray : null
		);

		selectBodyPart();
	}, [metaData]);

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
		</Box>
	);
};

export default AppHuman;
