import { FC, memo, useEffect, useRef } from "react";
import Webcam from "react-webcam";
import {
  Pose,
  POSE_CONNECTIONS,
  POSE_LANDMARKS_LEFT,
  POSE_LANDMARKS_RIGHT,
} from "@mediapipe/pose";
import { drawConnectors, drawLandmarks } from "@mediapipe/drawing_utils";
import { Camera } from "@mediapipe/camera_utils";
import { VisuallyHidden } from "@chakra-ui/react";
import Core from "../core/core";
import { MetaDataType, useApp } from "../contexts/AppContext";
import { useRouter } from "next/router";

const Canvas: FC = () => {
  const {
    setLandmarks,
    setMetaData,
    setRepCounter,
    setFPS,
    setCoreInstance,
    exercises,
    isIdeal,
  } = useApp();

  const videoRef = useRef<Webcam | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const router = useRouter();
  let camera: Camera;

  const excludedLandmarkSet = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const excludedConnectionSet = [
    [0, 1],
    [1, 2],
    [2, 3],
    [3, 7],
    [0, 4],
    [4, 5],
    [5, 6],
    [6, 8],
    [9, 10],
  ];

  if (canvasRef.current) {
    canvasRef.current.height = 720;
    canvasRef.current.width = 1280;
  }

  const landmarkRef = useRef<HTMLDivElement | null>(null);
  let coreInstance: Core | null;
  let canvasCtx: CanvasRenderingContext2D | null;
  let lastFrameTime: number = performance.now();

  const videoConstraints = {
    width: 1280,
    height: 720,
  };

  const onResults = (results: any) => {
    setFPS(1 / ((performance.now() - lastFrameTime) / 1000));
    lastFrameTime = performance.now();
    canvasCtx = canvasRef.current!.getContext("2d");
    if (coreInstance) {
      const getValue: MetaDataType = coreInstance!.update(
        results.poseLandmarks
      );
      setLandmarks(results.poseLandmarks);
      if (getValue === undefined) router.push("/exercises");
      if (getValue) {
        if (!isIdeal(getValue) && getValue.screenState === 4) {
          if (getValue.insertionData!.length > 2) {
            console.log(getValue.insertionData![0].sets);
            console.log(getValue.insertionData![1].sets);
            console.log(getValue.insertionData![2].sets);
          }
          coreInstance = null;
          router.push("/sessions/1");
        }
        if (isIdeal(getValue)) {
          if (getValue?.finalData.repCount != undefined)
            setRepCounter(getValue?.finalData.repCount);
        }
        setMetaData(getValue);
      }
    }

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
        drawConnectors(
          canvasCtx,
          results.poseLandmarks,
          POSE_CONNECTIONS.filter((n) => !excludedConnectionSet.includes(n)),
          {
            visibilityMin: 0.65,
            color: "white",
          }
        );
        drawLandmarks(
          canvasCtx,
          Object.values(POSE_LANDMARKS_LEFT).map((index) => {
            if (!excludedLandmarkSet.includes(index))
              return results.poseLandmarks[index];
          }),
          { visibilityMin: 0.65, color: "white", fillColor: "rgb(255,138,0)" }
        );
        drawLandmarks(
          canvasCtx,
          Object.values(POSE_LANDMARKS_RIGHT).map((index) => {
            if (!excludedLandmarkSet.includes(index))
              return results.poseLandmarks[index];
          }),
          { visibilityMin: 0.65, color: "white", fillColor: "rgb(0,217,231)" }
        );
      }
      canvasCtx.restore();
    }
  };

  useEffect(() => {
    console.log("New instance");
    coreInstance = new Core(exercises);
    setCoreInstance(coreInstance);
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
    if (videoRef.current != null && videoRef.current.video !== null) {
      camera = new Camera(videoRef.current.video, {
        onFrame: async () => {
          if (videoRef.current != null)
            await pose.send({ image: videoRef.current.video! });
        },
        width: 1280,
        height: 720,
      });
      camera.start();
    }

    return () => {
      console.log("Destroying camera and core instance");
      camera.stop();
      coreInstance = null;
      console.log(coreInstance);
    };
  }, []);

  return (
    <div className="container">
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
      {/* <div className="overlay-fps">
				<Badge colorScheme="purple" w={16}>
					<HStack color="green">
						<Text>FPS :</Text>
						<Text color="green" fontSize="lg">
							{FPS != 0 ? ` ${FPS.toPrecision(2)}` : null}
						</Text>
					</HStack>
				</Badge>
			</div> */}
      <canvas
        className="content"
        ref={canvasRef}
        // style={{
        //   height: "100%",
        //   width: "100%",
        // }}
      />
      <div ref={landmarkRef}></div>
    </div>
  );
};

export default memo(Canvas);
