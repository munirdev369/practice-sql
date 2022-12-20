import React, { useEffect, useState } from "react";
import { useDatabase, useQuestions } from "../../SQLDatabase";
import "./editor.css";

interface Props {
	index: number;
}

type TableType = {
	name: string;
	alias: string;
	columns: Array<{ id: number; name: string }>;
};

export const SqlTable: React.FunctionComponent<Props> = ({ index }) => {
	const db = useDatabase();
	const { data: questions, loading } = useQuestions();
	const [table, setTable] = useState<TableType>({
		name: "",
		alias: "",
		columns: [],
	});

	useEffect(() => {
		if (!db || loading) return;
		const { tableName } = questions[index];
		const result = db.exec(
			`SELECT name FROM PRAGMA_TABLE_INFO('${tableName}');`
		);
		const values = result.map((value) => value.values);
		const columns = values[0]
			.flatMap((e) => e)
			.map((e, idx) => ({ id: idx + 1, name: `${e}` }));
		setTable({
			name: tableName,
			alias: tableName.charAt(0).toUpperCase(),
			columns,
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [loading, index]);

	const handleAddTable: React.MouseEventHandler<HTMLParagraphElement> = (
		e
	) => {};

	return (
		<div className="sql-table">
			<div className="sql-table__header">
				<p className="asterik">*</p>
				<p className="table_name">{table.name}</p>
				<p className="alias">{table.alias}</p>
			</div>
			<div className="sql-table__body">
				{table.columns.map((c) => (
					<div key={c.id} className="sql-table__column">
						{c.name}
					</div>
				))}
			</div>
		</div>
	);
};
