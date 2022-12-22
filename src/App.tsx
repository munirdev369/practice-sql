import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Questions } from "./components/Questions";
import { Editor } from "./components/Editor";
import { Layout } from "./components/Layout";
import { Loader } from "./components/shared/Loader";
import { useQuestions } from "./SQLDatabase";
import ErrorBoundary from "./components/ErrorBoundary";
import { Result } from "./components/Result";

function App() {

	const { loading } = useQuestions();
	return (
		<BrowserRouter>
			<Layout>
				<Routes>
					<Route
						element={<Editor />}
						path={"/"}
						loader={() => <Loader color="blue" loading={loading} />}
					/>
					<Route
						element={<Result />}
						path={"/result"}
						loader={() => <Loader color="blue" loading={loading} />}
					/>
				</Routes>
			</Layout>
		</BrowserRouter>
	);
}

export default App;
