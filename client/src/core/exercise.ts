import { ExerciseObj } from "./types";
import * as exerciseFunc from "./exercises/exercises";
import { Deviation, Rep } from "./types";

export default class Exercise {
  start(currentExercise: ExerciseObj, keypoints: object, initFlag: boolean) {
    let values: {
      deviationObj: Deviation;
      repObj: Rep;
      message: string;
    };
    console.log(currentExercise);
    switch (currentExercise.name) {
      case "ohp":
        values = exerciseFunc.ohp(keypoints, initFlag);
        break;
      default:
        values = {
          deviationObj: {
            shoulder: 0,
            rightElbow: 0,
            leftElbow: 0,
          },
          repObj: {
            count: 0,
            flag: 1,
          },
          message: "Initializing",
        };
    }
    return values;
  }
}
