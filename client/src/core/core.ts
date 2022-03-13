import { PoseResult } from "./types";

	class Core {
	image: any | undefined;
	keypoints: object | undefined;
	currentExercise: string;
	exercise: object;

	constructor(currentExercise: string){
		this.currentExercise = currentExercise;
		this.exercise = import(`./exercises/${this.currentExercise}`);
		console.log(this.exercise);
	}

	update(result: PoseResult) {
		// Defaults
		this.image = result.image;
		this.keypoints = result.poseLandmarks;
	}

	start() {}

	end() {}

	next() {}
}

export default Core;
