import React from "react";

export const QuestionsText: React.FunctionComponent<{
	question: string;
	index: string | number;
}> = ({ question, index }) => {
	return (
		<p className="question">
			#Q{index} {question}
		</p>
	);
};
