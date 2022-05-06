import { angle, sideChecker, angleNormalized } from "../utils";
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

exerciseData["Seated Dumbbell Shoulder Press"] = [
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

messageData["Seated Dumbbell Shoulder Press"] = {
  shoulders: "Shoulders not at equal angles",
  leftElbow: "Left arm deviation detected",
  rightElbow: "Right arm deviation detected",
};

repsData["Seated Dumbbell Shoulder Press"] = {
  partName: "leftElbow",
  range: [35, 170], //Degrees of motion for a rep, [1] would be initial position
};

angleData["Seated Dumbbell Shoulder Press"] = {
  rightShoulder: 0,
  leftShoulder: 0,
  rightElbow: 0,
  leftElbow: 0,
};

export const ohp = (keypoints: any, initFlag: boolean) => {
  //Initializing variables
  if (initFlag) {
    exerciseData["Seated Dumbbell Shoulder Press"] = exerciseData[
      "Seated Dumbbell Shoulder Press"
    ].map((e) => {
      return { ...e, deviation: (e.deviation = 1) };
    });
    angleData["Seated Dumbbell Shoulder Press"] = {
      rightShoulder: 0,
      leftShoulder: 0,
      rightElbow: 0,
      leftElbow: 0,
    };
  }

  //Angles - AntiClockwise - 0 to 360 degrees
  angleData["Seated Dumbbell Shoulder Press"] = {
    rightShoulder: angle(keypoints[23], keypoints[11], keypoints[13]),
    leftShoulder: angle(keypoints[24], keypoints[12], keypoints[14]),
    rightElbow: angle(keypoints[15], keypoints[13], keypoints[11]),
    leftElbow: angle(keypoints[16], keypoints[14], keypoints[12]),
  };

  //Deviations
  // Shoulder - (360 - x) because clockwise takes outer angle otherwise
  exerciseData["Seated Dumbbell Shoulder Press"][0].deviation = Math.abs(
    360 -
      angleData["Seated Dumbbell Shoulder Press"].rightShoulder -
      angleData["Seated Dumbbell Shoulder Press"].leftShoulder
  );
  // Elbow (R)
  exerciseData["Seated Dumbbell Shoulder Press"][1].deviation = Math.abs(
    angleData["Seated Dumbbell Shoulder Press"].rightElbow -
      angleData["Seated Dumbbell Shoulder Press"].rightShoulder
  );
  // Elbow (L)
  exerciseData["Seated Dumbbell Shoulder Press"][2].deviation = Math.abs(
    angleData["Seated Dumbbell Shoulder Press"].leftElbow -
      angleData["Seated Dumbbell Shoulder Press"].leftShoulder
  );

  return { exerciseData, repsData, messageData, angleData };
};

exerciseData["Side Lateral Raises"] = [
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

messageData["Side Lateral Raises"] = {
  shoulders: "Shoulders not at equal angles",
  elbows: "Elbows are not at equal angles",
};

repsData["Side Lateral Raises"] = {
  partName: "leftShoulder",
  range: [20, 90], //Degrees of motion for a rep
};

angleData["Side Lateral Raises"] = {
  rightShoulder: 0,
  leftShoulder: 0,
  rightElbow: 0,
  leftElbow: 0,
};

export const lateral = (keypoints: any, initFlag: boolean) => {
  if (initFlag) {
    exerciseData["Side Lateral Raises"] = exerciseData[
      "Side Lateral Raises"
    ].map((e) => {
      return { ...e, deviation: (e.deviation = 1) };
    });
    angleData["Side Lateral Raises"] = {
      rightShoulder: 0,
      leftShoulder: 0,
      rightElbow: 0,
      leftElbow: 0,
    };
  }

  angleData["Side Lateral Raises"] = {
    rightShoulder: angle(keypoints[23], keypoints[11], keypoints[13]),
    leftShoulder: angle(keypoints[24], keypoints[12], keypoints[14]),
    rightElbow: angle(keypoints[15], keypoints[13], keypoints[11]),
    leftElbow: angle(keypoints[16], keypoints[14], keypoints[12]),
  };

  exerciseData["Side Lateral Raises"][0].deviation = Math.abs(
    360 -
      angleData["Side Lateral Raises"].rightShoulder -
      angleData["Side Lateral Raises"].leftShoulder
  );

  exerciseData["Side Lateral Raises"][1].deviation = Math.abs(
    angleData["Side Lateral Raises"].rightElbow -
      (360 - angleData["Side Lateral Raises"].leftElbow)
  );

  return { exerciseData, repsData, messageData, angleData };
};

exerciseData["Dumbbell Curl"] = [
  {
    partName: "shoulder",
    deviation: 0,
    maxDeviation: 5,
  },
];

messageData["Dumbbell Curl"] = {
  shoulder: "Shoulder not parallel to torso",
};

repsData["Dumbbell Curl"] = {
  partName: "elbow",
  range: [160, 30],
};

angleData["Dumbbell Curl"] = {
  shoulder: 0,
  elbow: 0,
};

export const curl = (keypoints: any, initFlag: boolean) => {
  let side = sideChecker(keypoints[13].z, keypoints[14].z);
  if (initFlag) {
    exerciseData["Dumbbell Curl"] = exerciseData["Dumbbell Curl"].map((e) => {
      return { ...e, deviation: (e.deviation = 1) };
    });
    angleData["Dumbbell Curl"] = {
      shoulder: 0,
      elbow: 0,
    };
  }

  angleData["Dumbbell Curl"] = {
    shoulder: side
      ? 360 - angle(keypoints[23], keypoints[11], keypoints[13])
      : angle(keypoints[24], keypoints[12], keypoints[14]),
    elbow: side
      ? angle(keypoints[15], keypoints[13], keypoints[11])
      : 360 - angle(keypoints[16], keypoints[14], keypoints[12]),
  };

  exerciseData["Dumbbell Curl"][0].deviation = Math.abs(
    angleNormalized(angleData["Dumbbell Curl"].shoulder)
  );

  return { exerciseData, repsData, messageData, angleData };
};
