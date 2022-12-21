import React, { CSSProperties, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { QuestionType, useDatabase, useQuestions } from "../../SQLDatabase";
import "./editor.css";
import { Button, Container } from "react-bootstrap";
import { SqlTable } from "./SqlTable";
import withModalErrorBoundary, { ErrorCause } from "../ErrorBoundary";
import { useError } from "../../hook/useError";
import { NextQsBtn } from "../shared/NextQsBtn";
import { Loader } from "../shared/Loader";
import { QuestionsText } from "./Question";
import { SuccessModal } from "./SuccessModal";

const btnStyles: CSSProperties = {
	maxWidth: "150px",
	height: 60,
	width: "100%",
	paddingTop: 10,
	paddingBottom: 10,
};

interface Props {
	questionsCompleted: number[];
	handleQuestionCompleted: (id: number) => void;
}

const EditorWithoutErrorBoundary: React.FunctionComponent<Props> = ({
	handleQuestionCompleted,
	questionsCompleted,
}) => {
	const { id } = useParams();
	const [open, setOpen] = useState(false);
	const [index, setIndex] = useState<number>(0);
	const [currentQuestion, setCurrentQuestion] = useState<QuestionType>({
		question: "",
		answerQuery: "",
		bindParams: null,
		level: -1,
		tableName: "",
	});
	const [showNextBtn, setShowNextBtn] = useState<boolean>(false);

	const { data: questions, loading } = useQuestions();
	const [loader, setLoader] = useState(false);

	const [answer, setAnswer] = useState("");
	const { throwError } = useError();
	const db = useDatabase();
	const navigate = useNavigate();
	const textAreaRef = useRef<HTMLTextAreaElement>(null);

	useEffect(() => {
		if (id && !loading) {
			let i = parseInt(id);
			if (isNaN(i) || i > questions.length) {
				navigate("/", { replace: true });
			}
			i--;
			setIndex(i);
			setCurrentQuestion(questions[i]);
			setLoader(false);
		}
	}, [id, loader, loading]);

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
		if (answer === "") return throwError("Empty query, Please write a query");
		const qs = questions[index];
		try {
			const {
				columns,
				values: data,
				result: actualResult,
			} = getQueryResult(qs.answerQuery);
			const { result: providedResult } = getQueryResult(
				answer.replace(";", "")
			);
			if (providedResult !== actualResult) {
				throw new Error("Results don't match");
			}
			setShowNextBtn(true);

			setOpen(true);
		} catch (error) {
			const { message = "" } = error as Error;
			return throwError(message);
		}
	};

	const handleNextBtnClick = () => {
		setLoader(false);
		setShowNextBtn(false);
		setAnswer("");
		handleQuestionCompleted(index)
	};

	if (loader || loading) {
		return <Loader color="blue" loading={loader || loading} />;
	}

	return (
		<Container
			onClick={() => {
				textAreaRef.current?.focus();
			}}
			className="sql-box"
		>
			<p className="question">
				#Q{index + 1} {currentQuestion?.question}
			</p>
			<textarea
				ref={textAreaRef}
				className="answers"
				value={answer}
				onChange={(e) => setAnswer(e.target.value)}
				autoFocus
				cols={20}
			></textarea>
			<SqlTable index={index} />
			<div className="d-flex  justify-content-between">
				<Button style={btnStyles} onClick={handleRun}>
					Run
				</Button>
				{showNextBtn ? (
					<NextQsBtn onClick={handleNextBtnClick} index={index} />
				) : null}
			</div>
			<SuccessModal
				index={index}
				open={open}
				handleClose={() => setOpen(false)}
				handleNextBtnClick={handleNextBtnClick}
			/>
		</Container>
	);
};

export const Editor = withModalErrorBoundary(EditorWithoutErrorBoundary);
