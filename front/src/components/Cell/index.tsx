import { useState } from "react";
import { Style } from "./style";
import { CellType } from "../../utils/types";
import axios from "axios";

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
	function randomHexColor(): string {
		const randomColor = Math.floor(Math.random() * 16777215).toString(16)
		return "#" + ("000000" + randomColor).slice(-6)
	}
	
	const [backgroundColor, setBackgroundColor] = useState(cell.color)

	return (
		<Style $backgroundColor={backgroundColor} onClick={() => {
			setNewColor(randomHexColor())
		}} />
	)
}

export default Cell