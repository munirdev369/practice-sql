import { useEffect, useState } from "react";
import { useDatabase } from "../../SQLDatabase";
import "./dbtables.css";
import {
	MdArrowDownward,
	MdArrowRight,
	MdCircle,
	MdFormatListBulleted,
	MdOutlineCircle,
} from "react-icons/md";
import { Loader } from "../shared/Loader";

type TableData = {
	id: number;
	name: string;
	columns: string[];
	showColumns: boolean;
}

export const DbTables = () => {
	const db = useDatabase();
	const [tables, setTables] = useState<TableData[]>([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (db) {
			setLoading(true)
			const data = [];
			const tables = db.exec(
				"select tbl_name from sqlite_master where type = 'table'"
			);

			const tableNames = tables
				.values()
				.next()
				.value.values.flatMap((e: any) => e);
			for (let i = 0; i < tableNames.length; i++) {
				const colQuery = db.exec(
					`SELECT name FROM PRAGMA_TABLE_INFO('${tableNames[i]}');`
				);
				const columns = colQuery.map((v) => v.values)[0].flatMap((c) => c) as string[];
				data.push({
					id: i + 1,
					name: tableNames[i],
					columns,
					showColumns: false,
				});
			}

			setTables(data)
			setLoading(false)
		}
	}, [db]);

	return (
		<div className="dbtables__container aside">
			<div className="aside_container">
				<h4
					className="fs-4 mx-5 my-3 py-3"
					style={{ textAlign: "left" }}
				>
					DataBase Tables
				</h4>
				{!loading && tables.length > 0 ? (
					<>
						<div
							className="d-flex align-items-start flex-column"
							style={{ paddingLeft: "40px", marginTop: "30px" }}
						>
							{tables?.map((table, idx) => (
								<div className="me-4 fs-5 py-3" key={table.id}>
									<div
										style={{ cursor: "pointer" }}
										onClick={() => {
											setTables((pt) => {
												return pt.map((t) =>
													t.id === table.id
														? { ...t, showColumns: !t.showColumns }
														: { ...t, showColumns: false }
												);
											});
										}}
									>
										<MdArrowRight
											color="#000"
											size={25}
											style={{
												marginRight: 10,
												rotate: `${table.showColumns ? 90 : 0}deg`,
											}}
										/>
										{table.name}
									</div>

									{table.showColumns ? (
										<div
											style={{ paddingTop: 10, marginLeft: 20 }}
											className="d-flex flex-column"
										>
											{table.columns.map((c) => (
												<p style={{ fontSize: 16 }} className="m-2" key={c}>
													{c}
												</p>
											))}
										</div>
									) : null}
								</div>
							))}
						</div>
					</>
				) : null}
			</div>
		</div>
	);
};
