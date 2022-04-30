import { ExerciseData, ExerciseObj, MessageData, RepsData } from "./types";
import * as exerciseFunc from "./exercises/exercises";

export default class Exercise {
  start(currentExercise: ExerciseObj, keypoints: object, initFlag: boolean) {
    let values:
      | {
          exerciseData: ExerciseData;
          repsData: RepsData;
          messageData: MessageData;
        }
      | undefined;
    switch (currentExercise.name) {
      case "ohp":
        values = exerciseFunc.ohp(keypoints, initFlag);
        break;
      default:
        values = undefined;
    }
    return values;
  }
}
