import { angle } from "../utils";
import {
  RepsDataParent,
  MessageDataParent,
  ExerciseDataParent,
  AngleDataParent,
} from "../types";

let exerciseData: ExerciseDataParent = {};
let messageData: MessageDataParent = {};
let angleData: AngleDataParent = {};
let repsData: RepsDataParent = {};

exerciseData.ohp = [
  {
    partName: "shoulders",
    deviation: 0,
    keypoints: [11, 12],
    range: [-10, 10],
    maxDeviation: 10,
  },
  {
    partName: "rightElbow",
    deviation: 0,
    keypoints: [13, 15],
    range: [-10, 10],
    maxDeviation: 10,
  },
  {
    partName: "leftElbow",
    deviation: 0,
    keypoints: [14, 16],
    range: [-10, 10],
    maxDeviation: 10,
  },
];

messageData.ohp = {
  shoulders: "Shoulders not at equal angles",
  leftElbow: "Left arm deviation detected",
  rightElbow: "Right arm deviation detected",
};

repsData.ohp = {
  partName: "leftElbow",
  range: [35, 170], //Degrees of motion for a rep
};

angleData.ohp = {
  rightShoulder: 0,
  leftShoulder: 0,
  rightElbow: 0,
  leftElbow: 0,
};

export const ohp = (keypoints: any, initFlag: boolean) => {
  /* 
	Deviations:
	- Left/Right shoulder
	- Left elbow
	- Right elbow
	*/

  //Initializing variables
  if (initFlag) {
    exerciseData.ohp = exerciseData.ohp.map((e) => {
      return { ...e, deviation: (e.deviation = 1) };
    });
    angleData.ohp = {
      rightShoulder: 0,
      leftShoulder: 0,
      rightElbow: 0,
      leftElbow: 0,
    };
  }

  //Angles - AntiClockwise - 0 to 360 degrees
  angleData.ohp = {
    rightShoulder: angle(keypoints[23], keypoints[11], keypoints[13]),
    leftShoulder: angle(keypoints[24], keypoints[12], keypoints[14]),
    rightElbow: angle(keypoints[15], keypoints[13], keypoints[11]),
    leftElbow: angle(keypoints[16], keypoints[14], keypoints[12]),
  };

  //Deviations
  // Shoulder - (360 - x) because anti clockwise takes outer angle otherwise
  exerciseData.ohp[0].deviation = Math.abs(
    angleData.ohp.rightShoulder - (360 - angleData.ohp.leftShoulder)
  );
  // Elbow (R)
  exerciseData.ohp[1].deviation = Math.abs(
    angleData.ohp.rightElbow - angleData.ohp.rightShoulder
  );
  // Elbow (L)
  exerciseData.ohp[2].deviation = Math.abs(
    angleData.ohp.leftElbow - angleData.ohp.leftShoulder
  );

  return { exerciseData, repsData, messageData, angleData };
};
