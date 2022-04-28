export type Keypoint = {
	x: number;
	y: number;
	z: number;
	visibility: number;
};

export interface Deviation {
	[key: string]: number;
}

export type Rep = {
	count: number;
	flag: number;
};

export type ExerciseObj = {
	name: string;
	// keypoints: Array<number>;
	reps: number;
};

export type CustomResult = {
	image: any;
	poseLandmarks: Array<Keypoint>;
	currentExercise: string;
};

export type PoseResult = {
	image: any;
	poseLandmarks: Array<Keypoint>;
	poseWorldLandmarks: Array<Keypoint>;
};
