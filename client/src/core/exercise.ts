import { CompoundData, ExerciseObj, FinalData } from "./types";
import * as exerciseFunc from "./exercises/exercises";
import Timer from "easytimer.js";

let timer = new Timer();
let compoundData: CompoundData;
let finalData: FinalData = {
  deviatingPart: "",
  message: "",
  deviationTimeObj: {},
  repFlag: false,
  repCount: -1,
  repTimeObj: {},
};

export default class Exercise {
  start(currentExercise: ExerciseObj, keypoints: object, initFlag: boolean) {
    if (initFlag) {
      timer.reset();
      compoundData = undefined;
      finalData = {
        deviatingPart: "",
        message: "",
        deviationTimeObj: {},
        repFlag: false,
        repCount: -1,
        repTimeObj: {},
      };
    }

    switch (currentExercise.name) {
      case "ohp":
        compoundData = exerciseFunc.ohp(keypoints, initFlag);
        break;
      default:
        compoundData = undefined;
    }
    if (
      compoundData?.exerciseData.every(
        (ele) => ele.deviation < ele.maxDeviation
      )
    ) {
      timer.reset();
      finalData.message = "";
      //Check reps as posture correct
      if (
        compoundData.angleData[compoundData.repsData.partName] <
          compoundData.repsData.range[0] &&
        !finalData.repFlag
      ) {
        finalData.repFlag = true;
        finalData.repCount += 1;
      } else if (
        compoundData.angleData[compoundData.repsData.partName] >
          compoundData.repsData.range[1] &&
        finalData.repFlag
      ) {
        finalData.repFlag = false;
      }
    } else {
      timer.start();
      if (timer.getTimeValues().seconds > 2) {
        let deviatingPartArray = compoundData?.exerciseData.filter(
          (ele) => ele.deviation > ele.maxDeviation
        );
        if (deviatingPartArray)
          finalData.deviatingPart =
            deviatingPartArray[deviatingPartArray.length - 1].partName;
        finalData.message = compoundData?.messageData[finalData.deviatingPart]!;
      } else {
        finalData.message = "";
      }
    }
    return { compoundData, finalData };
  }
}
