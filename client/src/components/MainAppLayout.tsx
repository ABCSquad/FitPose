import { Flex, IconButton, Text } from "@chakra-ui/react";
import React, { FC, useState } from "react";
import Canvas from "./Canvas";
import { FiArrowRight } from "react-icons/fi";
import { FiArrowLeft } from "react-icons/fi";
import InfoBar from "./InfoBar";
import WidgetBar from "./WidgetBar";
import { AnimatePresence, motion } from "framer-motion";

export const MainAppLayout: FC = () => {
	const [openWidget, setOpenWidget] = useState<boolean>(false);
	const [openInfo, setOpenInfo] = useState<boolean>(false);

	return (
		<div style={{ position: "absolute" }}>
			<div style={{ position: "relative" }}>
				<Canvas />
			</div>
			<div style={{ position: "relative", zIndex: 2 }}>
				<Flex
					h="100vh"
					w="100vw"
					dir="row"
					justify="space-between"
					align="center"
				>
					{" "}
					<Flex direction="row" justify="flex-start" alignItems="center">
						<AnimatePresence>
							{openInfo && (
								<>
									<motion.div
										key="info-window"
										initial={{ width: 0 }}
										animate={{
											width: "400px",
										}}
										exit={{ width: 0 }}
										transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
										className="info-window"
									>
										<InfoBar />
									</motion.div>
								</>
							)}
						</AnimatePresence>
						<IconButton
							m={2}
							variant="solid"
							colorScheme="teal"
							aria-label="Call Sage"
							fontSize="20px"
							icon={!openInfo ? <FiArrowRight /> : <FiArrowLeft />}
							onClick={() => {
								setOpenInfo(!openInfo);
							}}
						/>
					</Flex>
					<Flex direction="row" justify="flex-start" alignItems="center">
						<IconButton
							m={2}
							variant="solid"
							colorScheme="teal"
							aria-label="Call Sage"
							fontSize="20px"
							icon={openWidget ? <FiArrowRight /> : <FiArrowLeft />}
							onClick={() => {
								setOpenWidget(!openWidget);
							}}
						/>
						<AnimatePresence>
							{openWidget && (
								<>
									<motion.div
										initial={{ width: 0 }}
										animate={{
											width: 400,
										}}
										exit={{ width: "0px" }}
										transition={{ type: "spring", bounce: 0, duration: 0.4 }}
										className="widget-window"
									>
										<WidgetBar />
									</motion.div>
								</>
							)}
						</AnimatePresence>
					</Flex>
				</Flex>
			</div>
		</div>
	);
};
