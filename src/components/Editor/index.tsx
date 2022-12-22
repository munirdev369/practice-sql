import React, { CSSProperties, useRef, useState } from "react";
import { useDatabase } from "../../SQLDatabase";
import "./editor.css";
import { Button, Container } from "react-bootstrap";
import withModalErrorBoundary from "../ErrorBoundary";
import { useError } from "../../hook/useError";
import { SuccessModal } from "./SuccessModal";
import { useNavigate } from "react-router-dom";
import { Actions, useDispatch, useStore } from "../../store";

const btnStyles: CSSProperties = {
	maxWidth: "150px",
	height: 60,
	width: "100%",
	paddingTop: 10,
	paddingBottom: 10,
};

interface Props {}

const EditorWithoutErrorBoundary: React.FunctionComponent<Props> = ({}) => {
	const navigate = useNavigate();

	const { answer } = useStore();
	const dispatch = useDispatch();
	const { throwError } = useError();
	const db = useDatabase();

	const getQueryResult = (query: string) => {
		const expectedResult = db!.exec(query);
		const { columns, values } = expectedResult.values().next().value;
		const result = [columns, ...values]
			.map((item) => item.join(","))
			.join("\n");
		return {
			values,
			columns,
			result,
		};
	};

	const handleRun = () => {
		try {
			const { columns, values } = getQueryResult(answer.replace(";", ""));
			dispatch({ type: Actions.SET_RESULT, payload: { columns, values } });
			navigate("/result", { replace: true });
		} catch (error) {
			const { message = "" } = error as Error;
			return throwError(message);
		}
	};

	const handleViewResult = () => {
		navigate("/result", { replace: true });
	};

	return (
		<Container className="sql-box">
			<textarea
				className="answers"
				value={answer}
				onChange={(e) => {
					dispatch({ type: Actions.SET_ANSWER, payload: e.target.value });
				}}
				autoFocus
				cols={20}
			></textarea>
			<div className="d-flex  justify-content-between">
				<Button style={btnStyles} onClick={handleRun}>
					Run
				</Button>
				<Button style={btnStyles} onClick={handleViewResult}>
					View Results
				</Button>
			</div>
		</Container>
	);
};

export const Editor = withModalErrorBoundary(EditorWithoutErrorBoundary);
