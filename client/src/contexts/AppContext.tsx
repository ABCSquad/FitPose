import { createContext, useContext, useState } from "react";

/* Setting the types */
type AppContextProviderProps = {
	children: React.ReactNode;
};

interface MetaDataType {
	deviationObj: {
		leftElbow: number;
		rightElbow: number;
		shoulder: number;
	};
	repObj: Object;
	message: String;
}

type AppContextValueType = {
	blurState: Boolean;
	setBlurState: React.Dispatch<React.SetStateAction<Boolean>>;
	repCounter: Number;
	setRepCounter: React.Dispatch<React.SetStateAction<Number>>;
	metaData: MetaDataType | null;
	setMetaData: React.Dispatch<React.SetStateAction<MetaDataType | null>>;
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
	const [blurState, setBlurState] = useState<Boolean>(true);
	const [repCounter, setRepCounter] = useState<Number>(0);
	const [metaData, setMetaData] = useState<MetaDataType | null>(null);

	/* Value object to pass into the Provider. */
	const value = {
		blurState,
		setBlurState,
		repCounter,
		setRepCounter,
		metaData,
		setMetaData,
	};

	return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
