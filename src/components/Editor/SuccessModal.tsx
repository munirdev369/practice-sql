import { Button } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { useQuestions } from "../../SQLDatabase";
import { NextQsBtn } from "../shared/NextQsBtn";
import Modal from "../shared/Modal";
import { CSSProperties } from "react";

const backBtnStyles: CSSProperties = {
	maxWidth: "150px",
	width: "100%",
	height: 60,
	paddingTop: 10,
	paddingBottom: 10,
	margin: "0 auto",
	display: "block",
};

interface Props {
	open: boolean;
	handleClose: () => void;
}

export const SuccessModal: React.FunctionComponent<Props> = ({
	open,
	handleClose,
}) => {
	const navigate = useNavigate();
	const { data } = useQuestions();

	const handleBackBtnClick = () => {
		navigate("/1");
		handleClose();
	};

	return (
		<Modal
			open={open}
			handleClose={handleClose}
			text="Congratulations. Your answer is correct"
		></Modal>
	);
};
