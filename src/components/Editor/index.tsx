import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuestions } from "../../SQLDatabase";
import "./editor.css";
import { Container } from "react-bootstrap";
import { SqlTable } from "./SqlTable";

export const Editor = () => {
	const { id } = useParams();
	const [index, setIndex] = useState<number>(0);
	useEffect(() => {
		if (id) {
			setIndex(parseInt(id) - 1);
		}
	}, []);
	const [answer, setAnswer] = useState("");

	const { data: questions, loading } = useQuestions();
	const textAreaRef = useRef<HTMLTextAreaElement>(null);

	const handleChange: React.ChangeEventHandler<HTMLTextAreaElement> = (e) => {
		setAnswer(e.target.value);
	};

	const showTextPointer = () => {
		textAreaRef.current?.focus();
	};

	return (
		<Container onClick={showTextPointer} className="sql-box">
			<p className="question"># {!loading ? questions[index]?.question : ""}</p>
			<textarea
				ref={textAreaRef}
				className="answers"
				value={answer}
				onChange={handleChange}
				autoFocus
				cols={20}
			></textarea>
			<SqlTable index={index} />
		</Container>
	);
};
