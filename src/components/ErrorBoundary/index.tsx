import React, { PropsWithChildren } from "react";
import { ErrorModal } from "./ErrorModal";

export enum ErrorCause {
	Default = "Default",
}

export interface ErrorState {
	error: string;
	hasError: boolean;
	isOpen: boolean;
	errorCause: ErrorCause;
}

class ErrorBoundary extends React.Component<
	React.PropsWithChildren<{}>,
	ErrorState
> {
	constructor(props: React.PropsWithChildren<{}>) {
		super(props);
		this.state = {
			error: "",
			hasError: false,
			isOpen: false,
			errorCause: ErrorCause.Default,
		};
	}

	static getDerivedStateFromError(error: Error | any) {
		return {
			hasError: true,
		};
	}

	componentDidCatch(error: Error) {
		this.setState((prevState) => {
			const newState = {
				...prevState,
				error: `${error.message}`,
				isOpen: true,
			};
			if (error.cause) {
				newState.errorCause = error.cause as ErrorCause;
			}
			return newState;
		});
	}

	handleClose() {
		this.setState({ isOpen: false, hasError: false });
	}

	render() {
		const {
			error,
			hasError,
			isOpen,
			errorCause = ErrorCause.Default,
		} = this.state;
		if (hasError) {
			return (
				<>
					<ErrorModal
						open={isOpen}
						text={error}
						handleClose={this.handleClose.bind(this)}
						errorCause={errorCause}
					/>
					{this.props.children}
				</>
			);
		}
		return <>{this.props.children}</>;
	}
}

export default function withModalErrorBoundary<T extends {}>(
	Component: React.FunctionComponent<T & React.PropsWithChildren>
): React.FunctionComponent<T> {
	return (props: T) => (
		<ErrorBoundary>
			<Component {...props} />
		</ErrorBoundary>
	);
}
