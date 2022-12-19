import React, { PropsWithChildren } from "react";
import Header from "./Header";
import Footer from "./Footer";

export const Layout: React.FunctionComponent<PropsWithChildren> = ({
	children,
}) => {
	return (
		<div className="App">
			<Header />
			{children}
			<Footer />
		</div>
	);
};
