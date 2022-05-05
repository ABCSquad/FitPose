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
    maxDeviation: 10,
  },
  {
    partName: "rightElbow",
    deviation: 0,
    maxDeviation: 10,
  },
  {
    partName: "leftElbow",
    deviation: 0,
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
  // Shoulder - (360 - x) because clockwise takes outer angle otherwise
  exerciseData.ohp[0].deviation = Math.abs(
    360 - angleData.ohp.rightShoulder - angleData.ohp.leftShoulder
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

exerciseData.lateral = [
  {
    partName: "shoulders",
    deviation: 0,
    maxDeviation: 5,
  },
  {
    partName: "elbows",
    deviation: 0,
    maxDeviation: 10,
  },
];

messageData.lateral = {
  shoulders: "Shoulders not at equal angles",
  elbows: "Elbows are not at equal angles",
};

repsData.lateral = {
  partName: "leftShoulder",
  range: [20, 100], //Degrees of motion for a rep
};

angleData.lateral = {
  rightShoulder: 0,
  leftShoulder: 0,
  rightElbow: 0,
  leftElbow: 0,
};

export const lateral = (keypoints: any, initFlag: boolean) => {
  if (initFlag) {
    exerciseData.lateral = exerciseData.lateral.map((e) => {
      return { ...e, deviation: (e.deviation = 1) };
    });
    angleData.lateral = {
      rightShoulder: 0,
      leftShoulder: 0,
      rightElbow: 0,
      leftElbow: 0,
    };
  }

  angleData.lateral = {
    rightShoulder: angle(keypoints[23], keypoints[11], keypoints[13]),
    leftShoulder: angle(keypoints[24], keypoints[12], keypoints[14]),
    rightElbow: angle(keypoints[15], keypoints[13], keypoints[11]),
    leftElbow: angle(keypoints[16], keypoints[14], keypoints[12]),
  };

  exerciseData.lateral[0].deviation = Math.abs(
    360 - angleData.lateral.rightShoulder - angleData.lateral.leftShoulder
  );

  exerciseData.lateral[1].deviation = Math.abs(
    angleData.lateral.rightElbow - (360 - angleData.lateral.leftElbow)
  );

  return { exerciseData, repsData, messageData, angleData };
};
