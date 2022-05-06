import Exercise from "./exercise";
import { ExerciseObj } from "./types";

export default class Core {
  keypoints: object | undefined;
  exerciseArray: Array<ExerciseObj>;
  totalExerciseIndices: number;
  currentExercise: ExerciseObj;
  exerciseInstance: Exercise | null;
  repCount: number;
  // exercise: object;

  constructor(exerciseArray: Array<ExerciseObj>) {
    // DefinitFlagions
    this.repCount = -1;
    this.exerciseArray = exerciseArray;
    this.totalExerciseIndices = exerciseArray.length - 1;
    this.currentExercise = this.exerciseArray[0];
    this.exerciseInstance = new Exercise();
  }

  update(keypoints: object) {
    this.keypoints = keypoints;
    if (!this.blur()) {
      if (this.repCount > 0 && this.repCount === this.currentExercise.reps) {
        this.repCount = 0;
        return this.next();
      }
      return this.start(false);
    }
    return undefined;
  }

  start(initFlag: boolean) {
    const meta = this.exerciseInstance!.start(
      this.currentExercise,
      this.keypoints!,
      initFlag
    );
    if (meta.compoundData) {
      this.repCount = meta.finalData.repCount;
      // if (
      //   meta.compoundData.repsData[this.currentExercise.name].range[0] >
      //   meta.compoundData.repsData[this.currentExercise.name].range[1]
      // )
      //   meta.finalData.repFlag = !meta.finalData.repFlag;
    }

    return meta;
  }

  endExercise() {
    console.log("Data insertion");
  }

  next() {
    this.endExercise();
    let currentExerciseIndex = this.exerciseArray.indexOf(this.currentExercise);
    if (currentExerciseIndex < this.totalExerciseIndices) {
      this.currentExercise = this.exerciseArray[currentExerciseIndex + 1];
      console.log(`Next exercise ${this.currentExercise}`);
      return this.start(true);
    } else {
      console.log("End session");
      this.exerciseInstance = null;
      return {
        deviationObj: {
          shoulder: 0,
          rightElbow: 0,
          leftElbow: 0,
        },
        repObj: {
          count: 0,
          flag: 1,
        },
        message: "Ending session...",
      };
    }
  }

  blur() {
    if (this.keypoints === undefined) {
      return true;
    } else {
      return false;
    }
  }
}
