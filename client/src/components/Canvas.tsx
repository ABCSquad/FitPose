import React, { FC, useEffect, useRef } from "react";
import Webcam from "react-webcam";
import {
  Pose,
  POSE_CONNECTIONS,
  POSE_LANDMARKS_LEFT,
  POSE_LANDMARKS_RIGHT,
  POSE_LANDMARKS_NEUTRAL,
} from "@mediapipe/pose";
import { drawConnectors, drawLandmarks } from "@mediapipe/drawing_utils";
import { Camera } from "@mediapipe/camera_utils";
import { VisuallyHidden } from "@chakra-ui/react";
import Core from "../core/core";
import { useApp } from "../contexts/AppContext";
import { LandmarkGrid } from "@mediapipe/control_utils_3d";

const Canvas: FC = () => {
  const { blurState, FPS, setBlurState, setMetaData, setRepCounter, setFPS } =
    useApp();

  const videoRef = useRef<Webcam | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  if (canvasRef.current) {
    canvasRef.current.height = 720;
    canvasRef.current.width = 1280;
  }
  const landmarkRef = useRef<HTMLDivElement | null>(null);
  let coreInstance: Core;
  let canvasCtx: CanvasRenderingContext2D | null;
  let lastFrameTime = performance.now();

  // const grid = new LandmarkGrid(landmarkRef.current!, {
  //   connectionColor: 0xcccccc,
  //   definedColors: [
  //     { name: "LEFT", value: 0xffa500 },
  //     { name: "RIGHT", value: 0x00ffff },
  //   ],
  //   range: 2,
  //   fitToGrid: true,
  //   labelSuffix: "m",
  //   landmarkSize: 2,
  //   numCellsPerAxis: 4,
  //   showHidden: false,
  //   centered: true,
  // });

  const videoConstraints = {
    width: 1280,
    height: 720,
  };

  // useEffect(() => {
  //   console.log(blurState);
  // }, [blurState]);

  const onResults = (results: any) => {
    setFPS(1 / ((performance.now() - lastFrameTime) / 1000));
    lastFrameTime = performance.now();
    canvasCtx = canvasRef.current!.getContext("2d");
    setBlurState(coreInstance.blur());
    const getValue: any = coreInstance.update(results.poseLandmarks);
    if (getValue != undefined) setRepCounter(getValue.repObj.count);
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
          visibilityMin: 0.65,
          color: "white",
        });
        drawLandmarks(
          canvasCtx,
          Object.values(POSE_LANDMARKS_LEFT).map(
            (index) => results.poseLandmarks[index]
          ),
          { visibilityMin: 0.65, color: "white", fillColor: "rgb(255,138,0)" }
        );
        drawLandmarks(
          canvasCtx,
          Object.values(POSE_LANDMARKS_RIGHT).map(
            (index) => results.poseLandmarks[index]
          ),
          { visibilityMin: 0.65, color: "white", fillColor: "rgb(0,217,231)" }
        );
        drawLandmarks(
          canvasCtx,
          Object.values(POSE_LANDMARKS_NEUTRAL).map(
            (index) => results.poseLandmarks[index]
          ),
          { visibilityMin: 0.65, color: "white", fillColor: "white" }
        );
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
      {FPS != 0 ? `FPS: ${FPS.toPrecision(2)}` : null}
      <canvas
        ref={canvasRef}
        // style={{
        //   height: "100%",
        //   width: "100%",
        // }}
      />
      <div ref={landmarkRef}></div>
    </>
  );
};

export default Canvas;
