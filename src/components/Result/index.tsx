import { MdChevronLeft } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useStore } from "../../store";
import { DataTable } from "./DataTable";

export const Result = () => {
	const { result } = useStore();
	const navigate = useNavigate();
	return (
		<div>
			<div
				className="back-btn"
				style={{
					cursor: "pointer",
					margin: 10,
					background: "rgb(84, 138, 221)",
					color: "white",
					display:"grid",
					placeContent: "center",
					width: 40,
					borderRadius: "100vh",
					height: 40,
				}}
			>
				<MdChevronLeft
					fontSize={25}
					color="#fff"
					onClick={() => navigate("/")}
				/>
			</div>
			<DataTable {...result} />
		</div>
	);
};
