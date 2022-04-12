import { createContext, useContext, useState } from "react";

const AppContext = createContext({});

export const useApp = () => useContext(AppContext);

export default function AppContextProvider({ children }: any) {
  const [exercises, setExercises] = useState([]);
  const [blurState, setBlurState] = useState(true);
  const [repCounter, setRepCounter] = useState(0);
  const [metaData, setMetaData] = useState({});
  const value = {
    blurState,
    setBlurState,
    repCounter,
    setRepCounter,
    metaData,
    setMetaData,
    exercises,
    setExercises,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
