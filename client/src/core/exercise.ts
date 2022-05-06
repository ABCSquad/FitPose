import { CompoundData, ExerciseObj, FinalData } from "./types";
import * as exerciseFunc from "./exercises/exercises";
import Timer from "easytimer.js";

let timer = new Timer();
let compoundData: CompoundData;
let finalData: FinalData = {
  currentExercise: "",
  deviatingPartArray: [],
  deviatingPart: "",
  message: "",
  deviationDataObj: {},
  repFlag: false,
  repCount: -1,
  repDataObj: {},
};
let repInitFlag = true;

export default class Exercise {
  start(currentExercise: ExerciseObj, keypoints: object, initFlag: boolean) {
    if (initFlag) {
      timer.reset();
      repInitFlag = true;
      compoundData = undefined;
      finalData = {
        currentExercise: currentExercise.name,
        deviatingPartArray: [],
        deviatingPart: "",
        message: "",
        deviationDataObj: {},
        repFlag: false,
        repCount: -1,
        repDataObj: {},
      };
    }

    finalData.currentExercise = currentExercise.name;
    switch (currentExercise.name.toLowerCase()) {
      case "seated dumbbell shoulder press":
        compoundData = exerciseFunc.ohp(keypoints, initFlag);
        break;
      case "side lateral raises":
        compoundData = exerciseFunc.lateral(keypoints, initFlag);
        break;
      case "dumbbell curl":
        compoundData = exerciseFunc.curl(keypoints, initFlag);
        break;
      default:
        compoundData = undefined;
    }
    //Flipping the up/down flag if the range is flipped
    if (
      compoundData &&
      compoundData.repsData[currentExercise.name].range[0] >
        compoundData.repsData[currentExercise.name].range[1] &&
      repInitFlag
    ) {
      finalData.repFlag = !finalData.repFlag;
      repInitFlag = false;
    }
    if (
      compoundData?.exerciseData[currentExercise.name].every(
        (ele) => ele.deviation < ele.maxDeviation
      )
    ) {
      timer.reset();
      finalData.message = "";
      finalData.deviatingPart = "";
      finalData.deviatingPartArray = [];

      if (
        compoundData.angleData[currentExercise.name][
          compoundData.repsData[currentExercise.name].partName
        ] < Math.min(...compoundData.repsData[currentExercise.name].range) &&
        !finalData.repFlag
      ) {
        //Check reps as posture correct
        finalData.repFlag = !finalData.repFlag;
        finalData.repDataObj[finalData.repCount] = Date.now();
        finalData.repCount += 1;
      } else if (
        compoundData.angleData[currentExercise.name][
          compoundData.repsData[currentExercise.name].partName
        ] > Math.max(...compoundData.repsData[currentExercise.name].range) &&
        finalData.repFlag
      ) {
        finalData.repFlag = !finalData.repFlag;
      }
    } else {
      timer.start();
      if (timer.getTimeValues().seconds > 2) {
        finalData.deviationDataObj[finalData.repCount] = Date.now() - 2000;
        let deviatingPartArray = compoundData?.exerciseData[
          currentExercise.name
        ].filter((ele) => ele.deviation > ele.maxDeviation);
        if (deviatingPartArray)
          finalData.deviatingPartArray = deviatingPartArray;
        if (deviatingPartArray)
          finalData.deviatingPart =
            deviatingPartArray[deviatingPartArray.length - 1].partName;
        finalData.message =
          compoundData?.messageData[currentExercise.name][
            finalData.deviatingPart
          ]!;
      } else {
        finalData.message = "";
      }
    }
    return { compoundData, finalData };
  }
}
