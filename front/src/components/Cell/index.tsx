import { useState } from "react";
import { Style } from "./style";
import { CellType } from "../../utils/types";
import axios from "axios";
import { randomHexColor } from "../../utils/functions";

type PropsCell = {
	cell: CellType
}

function Cell({ cell }: PropsCell) {

	async function setNewColor(newColor: string) {

		await axios.post(`${import.meta.env.VITE_URL_BACK}/cell/${cell.id}/color`, {
			newColor: newColor
		})

		setBackgroundColor(newColor)
	}

	function selectCell() {
		setNewColor(randomHexColor())
	}
	
	const [backgroundColor, setBackgroundColor] = useState(cell.color)

	return (
		<Style $backgroundColor={backgroundColor} onClick={selectCell} />
	)
}

export default Cell