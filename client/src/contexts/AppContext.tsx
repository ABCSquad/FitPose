import { NormalizedLandmark } from "@mediapipe/pose";
import { createContext, useContext, useState } from "react";
import { CompoundData, ExerciseObj, FinalData } from "../core/types";
import Core from "../core/core";

/* Setting the types */
type AppContextProviderProps = {
  children: React.ReactNode;
};

interface MetaDataType {
  compoundData: CompoundData;
  finalData: FinalData;
}

type AppContextValueType = {
  exercises: Array<ExerciseObj>;
  setExercises: React.Dispatch<React.SetStateAction<Array<ExerciseObj>>>;
  blurState: Boolean;
  setBlurState: React.Dispatch<React.SetStateAction<Boolean>>;
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
  const [blurState, setBlurState] = useState<Boolean>(true);
  const [repCounter, setRepCounter] = useState<number>(0);
  const [metaData, setMetaData] = useState<MetaDataType | null>(null);
  const [FPS, setFPS] = useState<number>(0);
  const [landmarks, setLandmarks] = useState<Array<NormalizedLandmark>>([]);
  const [coreInstance, setCoreInstance] = useState<Core | undefined>(undefined);

  const appNavigationStop = () => {
    coreInstance?.endExercise();
  };

  const appNavigationNext = () => {
    coreInstance?.next();
  };

  /* Value object to pass into the Provider. */
  const value = {
    exercises,
    setExercises,
    blurState,
    setBlurState,
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
    appNavigationStop,
    appNavigationNext,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
