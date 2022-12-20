import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Questions } from "./components/Questions";
import { Editor } from "./components/Editor";
import { Layout } from "./components/Layout";

function App() {
	return (
		<BrowserRouter>
			<Layout>
				<Routes>
					<Route element={<Questions />} path={"/"} />
					<Route element={<Editor />} path={"/:id"} />
				</Routes>
			</Layout>
		</BrowserRouter>
	);
}

export default App;
