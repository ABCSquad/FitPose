export default class Core {
	static _instance: Core;

	image: any | undefined;
	keypoints: object | undefined;
	currentExercise: string;
	canvas: object;
	// exercise: object;

	// Defined Singleton : will give only one instance of Core.
	static getInstance(currentExercise: string, canvas: object) {
		if (!Core._instance) {
			Core._instance = new Core(currentExercise, canvas);
			console.log("same instance");
		}
		return Core._instance;
	}

	constructor(currentExercise: string, canvas: object) {
		// Definitions
		this.canvas = canvas;
		this.currentExercise = currentExercise;
		// this.keypoints = new Keypoints();

		// TODO: to get keypoints define seperate class and instantiate in constructor
	}

	start() {
		console.log(this.canvas);
	}

	end() {}

	next() {}
}
