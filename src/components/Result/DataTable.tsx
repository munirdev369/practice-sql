import Table from "react-bootstrap/Table";
import { CSSProperties, useMemo } from "react";
import "./result.css";


const containerStyles = {
	width: "fit-content",
	minWidth: "700px",
	margin: "0 auto",
	padding: "12px 15px",
	height: "85vh",
};

const noRecordsFoundStyles: CSSProperties = {
	...containerStyles,
	display: "grid",
	placeContent: "center",
	fontSize: "20px",
	letterSpacing: "1.2px",
	color: "#000",
	fontWeight: "bold",
	fontFamily: "Poppins",
};

const mainContainerStyles: CSSProperties = {
	...containerStyles,
	overflowY: "auto",
};

const cellStyles: CSSProperties = {
	maxWidth: "120px",
	overflowWrap: "break-word",
};

export const DataTable: React.FunctionComponent<{ columns: any[]; values: any[] }> = ({
	columns,
	values,
}) => {
	const idColumnName = useMemo(() => {
		return columns.find((c) => c.toLowerCase().includes("id"));
	}, [columns]);

	if (values.length === 0) {
		return <div style={noRecordsFoundStyles}>No Records Found</div>;
	}

	return (
		<>
			<div
				ref={(el) => {
					if (el) {
						el.style.setProperty("overflow", "scroll", "!important");
					}
				}}
				style={mainContainerStyles}
			>
				<Table
					border={2}
					cellSpacing={20}
					cellPadding={10}
					bordered
					hover
					size="sm"
				>
					<thead className="thead-light">
						<tr className="table-head">
							{columns.map((r) => (
								<th scope="col" style={cellStyles} key={r}>
									{r}
								</th>
							))}
						</tr>
					</thead>
					<tbody>
						{values.map((item, idx) => {
							const id =
								idColumnName !== undefined && idColumnName in item
									? item[idColumnName]
									: JSON.stringify(item) + Date.now();

							return (
								<tr className="table-row" key={id}>
									{Object.keys(item).map((k) => (
										<td style={cellStyles} key={`${id}-${k}`}>
											{item[k]}
										</td>
									))}
								</tr>
							);
						})}
					</tbody>
				</Table>
			</div>
		</>
	);
};

