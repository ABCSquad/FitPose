import React, { FC, useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import { Pose, POSE_CONNECTIONS } from "@mediapipe/pose";
import { drawConnectors, drawLandmarks } from "@mediapipe/drawing_utils";
import { Camera } from "@mediapipe/camera_utils";
import { VisuallyHidden } from "@chakra-ui/react";
import Core from "../core/core";
import { useApp } from "../contexts/AppContext";

const Canvas: FC = () => {
	const { blurState, setBlurState, setMetaData, setRepCounter }: any = useApp();

	const videoRef = useRef<Webcam | null>(null);
	const canvasRef = useRef<HTMLCanvasElement | null>(null);
	let canvasCtx: CanvasRenderingContext2D | null;
	let coreInstance: Core;

	const videoConstraints = {
		width: 1280,
		height: 720,
	};

	useEffect(() => {
		console.log(blurState);
	}, [blurState]);

	const onResults = (results: any) => {
		canvasCtx = canvasRef.current!.getContext("2d");
		setBlurState(coreInstance.blur());
		const getValue: any = coreInstance.update(results.poseLandmarks);
		if (getValue.repObj.count) setRepCounter(getValue.repObj.count);
		setMetaData(getValue);

		if (canvasCtx && canvasRef.current) {
			canvasCtx.save();
			canvasCtx.clearRect(
				0,
				0,
				canvasRef.current.width,
				canvasRef.current.height
			);
			canvasCtx.drawImage(
				results.image,
				0,
				0,
				canvasRef.current.width,
				canvasRef.current.height
			);
			if (results.poseLandmarks) {
				drawConnectors(canvasCtx, results.poseLandmarks, POSE_CONNECTIONS, {
					color: "#00FF00",
					lineWidth: 2,
				});
				drawLandmarks(canvasCtx, results.poseLandmarks, {
					color: "#FF0000",
					lineWidth: 1,
				});
			}
			canvasCtx.restore();
		}
	};

	useEffect(() => {
		const exerciseArray = [
			{ name: "ohp", keypoints: [23, 24, 11, 12, 13, 14, 15, 16], reps: 10 },
		];
		coreInstance = new Core(exerciseArray);

		const pose = new Pose({
			locateFile: (file) => {
				return `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`;
			},
		});
		pose.setOptions({
			modelComplexity: 1,
			selfieMode: true,
			smoothLandmarks: true,
			enableSegmentation: false,
			smoothSegmentation: true,
			minDetectionConfidence: 0.6,
			minTrackingConfidence: 0.3,
		});
		pose.onResults(onResults);
		if (typeof videoRef.current !== "undefined" && videoRef.current !== null) {
			const camera = new Camera(videoRef.current.video!, {
				onFrame: async () => {
					await pose.send({ image: videoRef.current!.video! });
				},
				width: 1280,
				height: 720,
			});
			camera.start();
		}
	}, []);

	return (
		<>
			<VisuallyHidden>
				<Webcam
					audio={false}
					height={720}
					ref={videoRef}
					screenshotFormat="image/jpeg"
					width={1280}
					videoConstraints={videoConstraints}
					// onUserMedia={() => {
					// 	console.log("videoRef.current", videoRef.current);
					// }}
				/>
			</VisuallyHidden>
			<canvas
				ref={canvasRef}
				style={{
					height: "100%",
					width: "100%",
				}}
			/>
		</>
	);
};

export default Canvas;
