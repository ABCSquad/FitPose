import Exercise from "./exercise";
import { ExerciseObj } from "./types";

export default class Core {
  keypoints: object | undefined;
  exerciseArray: Array<ExerciseObj>;
  totalExercises: number;
  currentExercise: ExerciseObj;
  exerciseInstance: Exercise | null;
  getValue: object | undefined;
  repCount: number;
  // exercise: object;

  constructor(exerciseArray: Array<ExerciseObj>) {
    // DefinitFlagions
    this.repCount = -1;
    this.exerciseArray = exerciseArray;
    this.totalExercises = exerciseArray.length - 1;
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
    if (meta) {
      this.repCount = meta.repsData.count;
    }
    return meta;
  }

  stop() {
    console.log("Data insertion");
  }

  next() {
    this.stop();
    let currentExerciseIndex = this.exerciseArray.indexOf(this.currentExercise);
    if (currentExerciseIndex < this.totalExercises) {
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
