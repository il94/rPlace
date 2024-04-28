import { MouseEvent, useState } from "react";
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

	const [cellPopup, displayCellPopup] = useState(false)

	function focusCell(event: MouseEvent<HTMLDivElement>) {
		event.target.focus()
		displayCellPopup(true)
		
		setNewColor(randomHexColor())
	}
	function blurCell() {
		displayCellPopup(false)
	}

	return (
		<>
			<Style onClick={focusCell} onBlur={blurCell}
				tabIndex={0} $backgroundColor={cell.color}>
			{ cellPopup && <CellPopup cell={cell} /> }
			</Style>
		</>
	)
}

export default Cell