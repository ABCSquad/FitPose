import React from "react";

const BlurScreen = () => {
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
		></div>
	);
};

export default BlurScreen;
