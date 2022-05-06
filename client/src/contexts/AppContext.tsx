import { NormalizedLandmark } from "@mediapipe/pose";
import { createContext, useContext, useState } from "react";
import {
  CompoundData,
  ExerciseObj,
  FinalData,
  InsertionData,
} from "../core/types";
import Core from "../core/core";

/* Setting the types */
type AppContextProviderProps = {
  children: React.ReactNode;
};

export enum ScreenState {
  "none" = 0,
  "noKeypoints" = 1,
  "pause" = 2,
  "start" = 3,
}

export type IdealMetaData = {
  compoundData: CompoundData;
  finalData: FinalData;
};

export type MetaDataType =
  | IdealMetaData
  | { screenState: ScreenState; exerciseName: string }
  | undefined;

type AppContextValueType = {
  exercises: Array<ExerciseObj>;
  setExercises: React.Dispatch<React.SetStateAction<Array<ExerciseObj>>>;
  repCounter: number;
  setRepCounter: React.Dispatch<React.SetStateAction<number>>;
  metaData: MetaDataType | null;
  setMetaData: React.Dispatch<React.SetStateAction<MetaDataType | null>>;
  FPS: number;
  setFPS: React.Dispatch<React.SetStateAction<number>>;
  landmarks: Array<NormalizedLandmark>;
  setLandmarks: React.Dispatch<React.SetStateAction<Array<NormalizedLandmark>>>;
  coreInstance: Core | undefined;
  setCoreInstance: React.Dispatch<React.SetStateAction<Core | undefined>>;
  insertionData: InsertionData;
  setInsertionData: React.Dispatch<React.SetStateAction<InsertionData>>;
  isIdeal: (obj: any) => obj is IdealMetaData;
  appNavigationStop: () => void;
  appNavigationNext: () => any;
};

/* Creating the context and export to useApp hook. */
const AppContext = createContext<AppContextValueType>(
  {} as AppContextValueType
);
export const useApp = () => useContext(AppContext);

/* Core App provider function */
export default function AppContextProvider({
  children,
}: AppContextProviderProps) {
  /* Context Internal States. */
  const [exercises, setExercises] = useState<Array<ExerciseObj>>([]);
  const [repCounter, setRepCounter] = useState<number>(0);
  const [metaData, setMetaData] = useState<MetaDataType | null>(null);
  const [FPS, setFPS] = useState<number>(0);
  const [landmarks, setLandmarks] = useState<Array<NormalizedLandmark>>([]);
  const [coreInstance, setCoreInstance] = useState<Core | undefined>(undefined);
  const [insertionData, setInsertionData] = useState<InsertionData>({
    repsData: {},
    deviationData: {},
  });

  function isIdeal(obj: any): obj is IdealMetaData {
    return obj.compoundData !== undefined;
  }
  const appNavigationStop = () => {};

  const appNavigationNext = () => {
    coreInstance?.next();
  };

  /* Value object to pass into the Provider. */
  const value = {
    exercises,
    setExercises,
    repCounter,
    setRepCounter,
    metaData,
    setMetaData,
    FPS,
    setFPS,
    landmarks,
    setLandmarks,
    coreInstance,
    setCoreInstance,
    insertionData,
    setInsertionData,
    isIdeal,
    appNavigationStop,
    appNavigationNext,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
