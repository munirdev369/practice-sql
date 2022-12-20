import {
	PropsWithChildren,
	createContext,
	useContext,
	useEffect,
	useState,
} from "react";
import initSqlJs from "sql.js";
import { Buffer } from 'buffer'
interface SQLDatabaseState {
	questions: Array<QuestionType>;
	db: initSqlJs.Database | null;
}

const initialState: SQLDatabaseState = {
	db: null,
	questions: [],
};

const SQLDatabaseContext = createContext(initialState);

interface Props {
	dbUrl: string;
	questionsUrl: string;
}

type QuestionType = {
	level: number;
	answerQuery: string;
	question: string;
	tableName: string;
	bindParams: null | Record<string, any>;
};

export const SQLDatabaseProvider: React.FunctionComponent<
	PropsWithChildren<Props>
> = ({ children, dbUrl, questionsUrl }) => {
	const [db, setDb] = useState<initSqlJs.Database | null>(null);
	const [questions, setQuestions] = useState<Array<QuestionType>>([]);
	const [, setError] = useState<any | null>(null);
	const fetchSqlJs = async () => {
		try {
			const [database, questions] = await Promise.all([
				fetch(dbUrl),
				fetch(questionsUrl).then((res) => res.json()),
			]);
			const [dataBuffer, SQL] = await Promise.all([
				database.arrayBuffer(),
				initSqlJs({
					locateFile: (url: string) => {
						return `/${url}`;
					},
				}),
			]);
			debugger;
			const dbSql = new SQL.Database(Buffer.from(dataBuffer));
			setDb(dbSql);
			setQuestions(questions);
		} catch (err) {
			setError(err);
		}
	};

	useEffect(() => {
		fetchSqlJs();
	}, []);

	return (
		<SQLDatabaseContext.Provider value={{ db, questions }}>
			{children}
		</SQLDatabaseContext.Provider>
	);
};

export const useDatabase = () => {
	const { db } = useContext(SQLDatabaseContext);
	if (!db) throw new Error("Database hasn't been initialized");
	return db;
};

export const useQuestions = () => {
	const { questions } = useContext(SQLDatabaseContext);
	return questions;
};