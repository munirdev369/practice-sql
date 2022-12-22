import React, {
	PropsWithChildren,
	createContext,
	useContext,
	useReducer,
} from "react";

interface InitialState {
	answer: string;
	result: {
		values: any[],
		columns: any[]
	};
}

export enum Actions {
	SET_ANSWER = "SET_ANSWER",
	SET_RESULT = "SET_RESULT",
}

interface ActionArg {
	type: Actions;
	payload: any;
}

const initialState: InitialState & {
	dispatch: React.Dispatch<ActionArg> | null;
} = {
	answer: "",
	result: {
		columns: [],
		values: [],
	},
	dispatch: null,
};

function reducer(state: InitialState, action: ActionArg): InitialState {
	switch (action.type) {
		case Actions.SET_ANSWER:
			return {
				...state,
				answer: action.payload,
			};
		case Actions.SET_RESULT:
			return {
				...state,
				result: action.payload,
			};
		default:
			return state;
	}
}

export const Store = createContext(initialState);

const StoreProvider: React.FunctionComponent<PropsWithChildren<{}>> = ({
	children,
}) => {
	const [data, dispatch] = useReducer(reducer, { answer: "", result: {  values: [], columns: [] } });

	return (
		<Store.Provider value={{ ...data, dispatch: dispatch }}>
			{children}
		</Store.Provider>
	);
};

export const useStore = () => {
	const { dispatch, ...data } = useContext(Store);
	return data;
};
export const useDispatch = () => {
	const { dispatch } = useContext(Store);
	return dispatch!;
}

export default StoreProvider;
