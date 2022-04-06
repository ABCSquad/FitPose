import { FC } from "react";
import { MainAppLayout } from "../components/MainAppLayout";
import AppContextProvider from "../contexts/AppContext";

const App: FC = () => {
	return (
		<AppContextProvider>
			<MainAppLayout />
		</AppContextProvider>
	);
};

export default App;
