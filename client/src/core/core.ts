type Result = {
	image: HTMLCanvasElement;
	poseLandmarks: object;
	currentExercise: string;
};

class Core {
	image: any;
	keypoints: object;
	currentExercise: string;
	exercise: object;

	constructor(result: Result) {
		// Defaults
		this.image = result.image;
		this.keypoints = result.poseLandmarks;
		this.currentExercise = result.currentExercise;

		// Setup
		// --import--
		this.exercise = import(`./exercises/${this.currentExercise}`);
		console.log(this.exercise);
	}

	start() {}

	end() {}

	next() {}
}

export default Core;
