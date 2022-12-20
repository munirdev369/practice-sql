import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Questions } from "./components/Questions";
import { Editor } from "./components/Editor";
import { Layout } from "./components/Layout";
import { Loader } from "./components/shared/Loader";
import { useQuestions } from "./SQLDatabase";

function App() {
	const [questionsCompleted, setQuestionsCompleted] = useState<number[]>([
		2, 4, 3,
	]);

	const { loading } = useQuestions();

	const onQuestionComplete = (id: number) => {
		setQuestionsCompleted((c) => [...new Set([...c, id])]);
	};

	return (
		<BrowserRouter>
			<Layout>
				<Routes>
					<Route
						element={<Questions questionsCompleted={questionsCompleted} />}
						path={"/"}
					/>
					<Route
						element={<Editor />}
						path={"/:id"}
						loader={() => <Loader color="blue" loading={loading} />}
					/>
				</Routes>
			</Layout>
		</BrowserRouter>
	);
}

export default App;
