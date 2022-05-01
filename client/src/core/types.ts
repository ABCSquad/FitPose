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
  maxDeviation: number;
};

export type ExerciseData = Array<ExerciseDataObj>;

export type MessageData = {
  [partName: string]: string;
};

export type RepsData = {
  partName: number;
  range: Array<number>;
};

export interface AngleData {
  [key: string]: number;
}

export type CompoundData =
  | {
      exerciseData: ExerciseData;
      repsData: RepsData;
      messageData: MessageData;
      angleData: AngleData;
    }
  | undefined;

export type FinalData = {
  deviatingPart: string;
  message: string;
  deviationTimeObj: { [key: number]: string } | {};
  repFlag: boolean;
  repCount: number;
  repTimeObj: { [key: number]: string } | {};
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
