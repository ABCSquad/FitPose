import { angle } from "../utils";
import { RepsData, MessageData, ExerciseData, AngleData } from "../types";

let exerciseData: ExerciseData = [
  {
    partName: "shoulders",
    deviation: 0,
    keypoints: [11, 12],
    range: [-10, 10],
    maxDeviation: 5,
  },
  {
    partName: "rightElbow",
    deviation: 0,
    keypoints: [13, 15],
    range: [-10, 10],
    maxDeviation: 5,
  },
  {
    partName: "leftElbow",
    deviation: 0,
    keypoints: [14, 16],
    range: [-10, 10],
    maxDeviation: 5,
  },
];

let messageData: MessageData = {
  shoulders: "Shoulders not at equal angles",
  leftElbow: "Left arm deviation detected",
  rightElbow: "Right arm deviation detected",
};

let repsData: RepsData = {
  partName: "leftElbow",
  range: [20, 170], //Degrees of motion for a rep
};

let angleData: AngleData = {
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
    exerciseData = exerciseData.map((e) => {
      return { ...e, deviation: (e.deviation = 1) };
    });
    angleData = {
      rightShoulder: 0,
      leftShoulder: 0,
      rightElbow: 0,
      leftElbow: 0,
    };
  }

  //Angles - AntiClockwise - 0 to 360 degrees
  angleData = {
    rightShoulder: angle(keypoints[23], keypoints[11], keypoints[13]),
    leftShoulder: angle(keypoints[24], keypoints[12], keypoints[14]),
    rightElbow: angle(keypoints[15], keypoints[13], keypoints[11]),
    leftElbow: angle(keypoints[16], keypoints[14], keypoints[12]),
  };

  //Deviations
  // Shoulder - (360 - x) because anti clockwise takes outer angle otherwise
  exerciseData[0].deviation = Math.abs(
    angleData.rightShoulder - (360 - angleData.leftShoulder)
  );
  // Elbow (R)
  exerciseData[1].deviation = Math.abs(
    angleData.rightElbow - angleData.rightShoulder
  );
  // Elbow (L)
  exerciseData[2].deviation = Math.abs(
    angleData.leftElbow - angleData.leftShoulder
  );

  //   if (
  //     Math.abs(deviationObj.shoulder) > 10 ||
  //     Math.abs(deviationObj.rightElbow) > 10 ||
  //     Math.abs(deviationObj.leftElbow) > 10
  //   ) {
  //     timer.start();
  //     console.log(repObj.count);
  //     if (timer.getTimeValues().seconds > 0.4) {
  //       if (deviationObj.shoulder > 10) {
  //         message = messages.ohp.shoulder;
  //       } else if (Math.abs(deviationObj.rightElbow) > 10) {
  //         if (Math.abs(deviationObj.leftElbow) < 10) {
  //           message = messages.ohp.leftElbow;
  //         } else {
  //           message = messages.ohp.wrong;
  //         }
  //       } else if (Math.abs(deviationObj.leftElbow) > 10) {
  //         if (Math.abs(deviationObj.rightElbow) < 10) {
  //           message = messages.ohp.rightElbow;
  //         } else {
  //           message = messages.ohp.wrong;
  //         }
  //       }
  //     }
  //   } else {
  //     // console.log("position is fine");
  //     message = messages.ohp.correct;
  //     timer.reset();
  //   }

  //   if (
  //     deviationObj.shoulder < 15 &&
  //     deviationObj.rightElbow < 15 &&
  //     deviationObj.leftElbow < 15
  //   ) {
  //     if (
  //       angle(keypoints[24], keypoints[12], keypoints[14]) < 90 &&
  //       repObj.flag != 1
  //     ) {
  //       repObj.flag = 1;
  //       repObj.count += 1;
  //     } else if (
  //       angle(keypoints[24], keypoints[12], keypoints[14]) > 170 &&
  //       repObj.flag === 1
  //     ) {
  //       repObj.flag = 0;
  //     }
  //   }

  return { exerciseData, repsData, messageData, angleData };
};
