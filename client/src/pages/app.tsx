import { withUrqlClient } from "next-urql";
import { FC } from "react";
import { MainAppLayout } from "../components/MainAppLayout";
import createUrlqlClient from "../utils/createUrqlClient";

const App: FC = () => {
	return <MainAppLayout />;
};

export default withUrqlClient(createUrlqlClient)(App);
