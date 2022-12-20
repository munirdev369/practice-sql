import { Container, Card } from "react-bootstrap";
import { useQuestions } from "../../SQLDatabase";
import { CSSProperties } from "react";
import { Loader } from "../shared/Loader";
import { useNavigate } from "react-router-dom";
import { CompletedCheck } from "../shared/CompletedCheck";

const questionCardStyles: CSSProperties = {
	marginBottom: 10,
	padding: 20,
	cursor: "pointer",
	display: "grid",
	gridTemplateColumns: "50px 1fr auto",
};

const questionTagStyles: CSSProperties = {
	textAlign: "center",
	lineHeight: "35px",
	paddingTop: 2,
};

const questionTextStyles: CSSProperties = {
	fontSize: 20,
	lineHeight: "35px",
	fontWeight: "500",
};

interface Props {
	questionsCompleted: number[];
}

export const Questions: React.FunctionComponent<Props> = ({
	questionsCompleted,
}) => {
	const { data, loading } = useQuestions();
	const navigate = useNavigate();

	console.log(questionsCompleted);

	return (
		<Container style={{ marginTop: 60 }}>
			{!loading ? (
				data.map((item, idx) => {
					return (
						<Card
							onClick={() => navigate(`/${idx + 1}`)}
							key={idx}
							style={questionCardStyles}
						>
							<span style={questionTagStyles}>#{idx + 1}</span>
							<h3 className="fs-5 px-2 fw-500" style={questionTextStyles}>
								{item.question}
							</h3>
							{questionsCompleted.includes(idx) ? <CompletedCheck /> : null}
						</Card>
					);
				})
			) : (
				<Loader color="blue" loading={loading} />
			)}
		</Container>
	);
};
