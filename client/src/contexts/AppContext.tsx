import { NormalizedLandmark } from "@mediapipe/pose";
import { createContext, useContext, useState } from "react";
import { CompoundData, FinalData } from "../core/types";

/* Setting the types */
type AppContextProviderProps = {
	children: React.ReactNode;
};

interface MetaDataType {
	compoundData: CompoundData;
	finalData: FinalData;
}

type AppContextValueType = {
	exercises: Array<Object | undefined>;
	setExercises: React.Dispatch<React.SetStateAction<Array<Object | undefined>>>;
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
	const [exercises, setExercises] = useState<Array<Object | undefined>>([]);
	const [blurState, setBlurState] = useState<Boolean>(true);
	const [repCounter, setRepCounter] = useState<number>(0);
	const [metaData, setMetaData] = useState<MetaDataType | null>(null);
	const [FPS, setFPS] = useState<number>(0);
	const [landmarks, setLandmarks] = useState<Array<NormalizedLandmark>>([]);

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
	};

	return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
