import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const NextQsBtn: React.FunctionComponent<{
	index: number;
	onClick: React.MouseEventHandler;
}> = ({ index, onClick }) => {
	const navigate = useNavigate();
	return (
		<Button
			style={{
				maxWidth: "150px",
				width: "100%",
				height: 60,
				paddingTop: 10,
				margin: "0 auto",
				display: "block",
				paddingBottom: 10,
			}}
			onClick={(e) => {
				navigate(`/${index + 2}`, { replace: true });
				onClick(e);
			}}
		>
			Next
		</Button>
	);
};
