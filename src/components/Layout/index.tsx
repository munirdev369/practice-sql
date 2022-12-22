import React, { PropsWithChildren } from "react";
import Header from "./Header";
import { DbTables } from "../DbTables";

export const Layout: React.FunctionComponent<PropsWithChildren> = ({
	children,
}) => {
	return (
		<div className="App">
			<Header />
			<DbTables />
			<div className="main">{children}</div>
		</div>
	);
};
