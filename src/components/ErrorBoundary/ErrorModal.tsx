import { ErrorCause, ErrorState } from ".";
import Modal, { AppModalProps } from "../shared/Modal";
import { DefaultError } from "./DefaultError";

export const ErrorModal: React.FunctionComponent<
	AppModalProps & Pick<ErrorState, "errorCause">
> = ({ open, text, handleClose, errorCause }) => {
	const contentOnCause: Record<ErrorCause, JSX.Element> = {
		Default: <DefaultError handleClose={handleClose} />,
	};

	return (
		<Modal open={open} text={text} handleClose={handleClose}>
			{contentOnCause[errorCause]}
		</Modal>
	);
};
