import Exercise from "./exercise";
import { ExerciseObj, FinalData, InsertionData } from "./types";

export default class Core {
  keypoints: object | undefined;
  exerciseArray: Array<ExerciseObj>;
  totalExerciseIndices: number;
  currentExercise: ExerciseObj;
  exerciseInstance: Exercise | null;
  repCount: number;
  repDataObj: FinalData["repDataObj"];
  deviationDataObj: FinalData["deviationDataObj"];
  insertionData: InsertionData;
  // exercise: object;

  constructor(exerciseArray: Array<ExerciseObj>) {
    // DefinitFlagions
    this.repCount = -1;
    this.exerciseArray = exerciseArray;
    this.totalExerciseIndices = exerciseArray.length - 1;
    this.currentExercise = this.exerciseArray[0];
    this.repDataObj = {};
    this.deviationDataObj = {};
    this.insertionData = { repsData: {}, deviationData: {} };
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
    }
    this.repDataObj = meta.finalData.repDataObj;
    this.deviationDataObj = meta.finalData.deviationDataObj;
    return meta;
  }

  endSession() {
    console.log(this.insertionData);
  }

  next() {
    let currentExerciseIndex = this.exerciseArray.indexOf(this.currentExercise);
    if (currentExerciseIndex < this.totalExerciseIndices) {
      this.insertionData.repsData[this.currentExercise.name] = this.repDataObj;
      this.insertionData.deviationData[this.currentExercise.name] =
        this.deviationDataObj;
      this.currentExercise = this.exerciseArray[currentExerciseIndex + 1];
      console.log(`Next exercise ${this.currentExercise}`);
      return this.start(true);
    } else {
      console.log("End session");
      this.exerciseInstance = null;
      this.endSession();
      return undefined;
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
