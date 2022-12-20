interface DefaultErrorProps {
	handleClose: () => void;
}

export const DefaultError: React.FunctionComponent<DefaultErrorProps> = ({
	handleClose,
}) => {
	return (
		<button
			className="btn btn-danger"
			style={{ display: "grid", margin: "0 auto" }}
			onClick={handleClose}
		>
			Try again
		</button>
	);
};
