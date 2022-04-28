import { ExerciseObj } from "./types";
import * as exerciseFunc from "./exercises/exercises";

export default class Exercise {
	start(currentExercise: ExerciseObj, keypoints: object) {
		let values = {};
		switch (currentExercise.name) {
			case "ohp":
				values = exerciseFunc.ohp(keypoints);
		}
		return values;
	}
}
