import { Box, Center } from "@chakra-ui/react";
import React, { FC, useEffect, useRef, useState } from "react";
import { useApp } from "../../../contexts/AppContext";
import Plot from "react-plotly.js";

const ThreeDGraph: FC = () => {
	const LINKS = [
		[8, 6, 5, 4, 0, 1, 2, 3, 7],
		[16, 14, 12, 11, 13, 15],
		[28, 26, 24, 12],
		[27, 25, 23, 11],
		[24, 23],
	];
	const { landmarks } = useApp();
	const landmarkRef = useRef<HTMLDivElement | null>(null);
	const [forceData, setForceData] = useState<any>({});

	useEffect(() => {
		if (landmarks) {
			let xNode: any = { 0: [], 1: [], 2: [], 3: [], 4: [] };
			let yNode: any = { 0: [], 1: [], 2: [], 3: [], 4: [] };
			let zNode: any = { 0: [], 1: [], 2: [], 3: [], 4: [] };

			LINKS.forEach((e: any, i: number) => {
				e.forEach((e: any) => {
					xNode[i].push(landmarks[e].x.toString());
					yNode[i].push(landmarks[e].z.toString());
					zNode[i].push(landmarks[e].y.toString());
				});
			});

      let forceMadeArray = [0, 1, 2, 3, 4].map((e) => {
        return {
          x: Object.values(xNode)[e],
          y: Object.values(yNode)[e],
          z: Object.values(zNode)[e],
          mode: "lines",
          marker: {
            size: 12,
            line: {
              color: "rgba(217, 217, 217, 0.14)",
              width: 0.5,
            },
            opacity: 0.8,
          },
          type: "scatter3d",
        };
      });
      setForceData(forceMadeArray);
    }
  }, [landmarks]);

	return (
		<Box
			mb={3}
			h="100%"
			w="100%"
			borderWidth="2px"
			borderRadius="30px"
			borderColor="InactiveBorder"
			bg="white"
			p={2}
		>
			{landmarks && (
				<Plot
					style={{
						height: "100%",
						width: "100%",
					}}
					useResizeHandler={true}
					config={{
						responsive: true,
						displayModeBar: false,
					}}
					layout={{
						height: undefined,
						width: undefined,
						autosize: true,
						title: `Pose Landmarks`,

						showlegend: false,
						scene: {
							aspectmode: "cube",
							xaxis: { mirror: true, range: [0, 1], zeroline: false },
							zaxis: {
								autorange: "reversed",
								zeroline: false,
								range: [-10, 10],
							},
							yaxis: {
								mirror: true,
								range: [-5, 5],
								zeroline: false,
							},
						},
					}}
					data={forceData}
				/>
			)}
		</Box>
	);
};

export default ThreeDGraph;
