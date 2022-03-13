export type Keypoint = {
	x: number,
	y: number,
	z: number,
	visibility: number
}

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
