import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { SQLDatabaseProvider } from "./SQLDatabase";
import StoreProvider from "./store";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<SQLDatabaseProvider
			dbUrl="/DigitalEvidenceDB.db"
			questionsUrl="/questions.json"
		>
			<StoreProvider>
				<App />
			</StoreProvider>
		</SQLDatabaseProvider>
	</React.StrictMode>
);
