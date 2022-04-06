import Exercise from "./exercise";
import { ExerciseObj } from "./types";

export default class Core {
	keypoints: object | undefined;
	exerciseArray: Array<ExerciseObj>;
	currentExercise: ExerciseObj;
	exerciseInstance: Exercise;
	getValue: object | undefined;
	// exercise: object;

	constructor(exerciseArray: Array<ExerciseObj>) {
		// Definitions
		this.exerciseArray = exerciseArray;
		this.currentExercise = this.exerciseArray[0];
		this.exerciseInstance = new Exercise();
	}

	update(keypoints: object) {
		this.keypoints = keypoints;
		if (!this.blur()) {
			return this.start();
		}
	}

	start() {
		return this.exerciseInstance.start(this.currentExercise, this.keypoints!);
	}

	blur() {
		if (this.keypoints === undefined) {
			return true;
		} else {
			return false;
		}
	}
}
