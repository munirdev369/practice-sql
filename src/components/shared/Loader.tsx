import { CSSProperties } from "react";
import ReactLoader from "react-spinners/BeatLoader";

const override: CSSProperties = {
	display: "flex",
	margin: "50 auto",
	placeContent: "center",
};

interface Props {
	loading: boolean;
	color: string;
}

export const Loader: React.FunctionComponent<Props> = ({ loading, color }) => {
	return (
		<ReactLoader
			color={color}
			loading={loading}
			cssOverride={override}
			size={20}
			aria-label="Loading Spinner"
			data-testid="loader"
		/>
	);
};
