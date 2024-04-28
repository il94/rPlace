import { useState } from "react";
import { Style } from "./style";
import { CellType } from "../../utils/types";
import axios from "axios";
import { randomHexColor } from "../../utils/functions";
import CellPopup from "./CellPopup";

type PropsCell = {
	cell: CellType
}

function Cell({ cell }: PropsCell) {

	async function setNewColor(newColor: string) {
		await axios.post(`${import.meta.env.VITE_URL_BACK}/cell/${cell.id}/color`, {
			newColor: newColor
		})
	}

	const [cellPopup, displayCellpopup] = useState<boolean>(false)

	function selectCell() {
		// displayCellpopup(true)
		setNewColor(randomHexColor())
	}

	return (
		<>
			<Style $backgroundColor={cell.color} onClick={selectCell}>
				{ cellPopup && <CellPopup /> }
			</Style>
		</>
	)
}

export default Cell