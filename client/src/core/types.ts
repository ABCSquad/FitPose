export type Keypoint = {
  x: number;
  y: number;
  z: number;
  visibility: number;
};

export type ExerciseDataObj = {
  partName: string;
  deviation: number;
  keypoints: number[];
  range: number[];
};

export type ExerciseData = Array<ExerciseDataObj>;

export type MessageData = {
  [partName: string]: string;
};

export type RepsData = {
  flag: boolean;
  partName: number;
  range: Array<number>;
  count: number;
};

export interface AngleData {
  [key: string]: number;
}

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
