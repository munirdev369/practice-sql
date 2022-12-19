import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { SQLDatabaseProvider } from "./SQLDatabase";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<SQLDatabaseProvider dbUrl="/STunesStore.sqlite" questionsUrl="/questions.json">
			<App />
		</SQLDatabaseProvider>
	</React.StrictMode>
);
