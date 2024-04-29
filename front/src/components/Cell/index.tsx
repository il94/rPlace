import { Dispatch, MouseEvent, SetStateAction, useState } from "react";
import { Style } from "./style";
import { CellType, StatePosition } from "../../utils/types";
import axios from "axios";
import { randomHexColor } from "../../utils/functions";
import CellPopup from "./CellPopup";
import { useControls } from "react-zoom-pan-pinch";

type PropsCell = {
	cell: CellType,
	displayToolBar: Dispatch<SetStateAction<StatePosition>>
}

function Cell({ cell, displayToolBar }: PropsCell) {

	const controls = useControls()

	async function setNewColor(newColor: string) {
		await axios.post(`${import.meta.env.VITE_URL_BACK}/cell/${cell.id}/color`, {
			newColor: newColor
		})
	}


	const [cellPopup, displayCellPopup] = useState(false)

	function focusCell(event: MouseEvent<HTMLDivElement>) {
		event.target.focus()

		// console.log("CONTEXT previousscale", context.transformState)
		// console.log("CONTEXT startCoord", context.startCoords)

		const grid = event.target.parentElement.parentElement.parentElement.getBoundingClientRect()
		const child = event.target.parentElement.getBoundingClientRect()
		const cell = event.target.getBoundingClientRect()
		
		// console.log(controls.instance.bounds?.minPositionY)
		// console.log(cell.bottom)
		// console.log(controls.instance)
		// console.log(controls.instance)
		// console.log(controls.instance.startCoords.y)
		// console.log(controls.instance.transformState.previousScale)

		const previousScale = 1.75
		const startCoordX = controls.instance.startCoords.x - grid.left
		const startCoordY = controls.instance.startCoords.y - grid.top

		// console.log("previousscale", previousScale)
		// console.log("startCoord", startCoordY)
		// console.log(startCoordY / previousScale)
		// console.log(event.clientY)

		let resultY =  (startCoordY ) / controls.instance.transformState.scale + 40
		let resultX =  (startCoordX ) / controls.instance.transformState.scale - (300 / 2)
		// const result =   controls.instance.startCoords?.y - 200

		// console.log("ResultY", resultY)
		// console.log("ResultX", resultX)

		if (resultY >= 560 - 40)
		// {
			resultY -= 170
		// 	console.log("DEPASSE")
		// }

		if (resultX >= 560 - 300)
		// {
				resultX = 560 - 305
		// 	console.log("DEPASSEXXXX")
		// }
		else if (resultX < 0)
			resultX = 5
			

		// console.log("GRID", grid, event.target.parentElement.parentElement.parentElement)
		// console.log("CHILD", child, event.target.parentElement)
		// console.log("CELL", cell, event.target)
		// console.log("test", result + 50)
		// console.log("test2", controls.instance.startCoords.y - controls.instance.transformState.positionY)
		// console.log(560 * controls.instance.transformState.previousScale)
		// console.log("====================================")


		displayToolBar({
			display: true,
			top: resultY,
			left: resultX,
		})

		displayCellPopup(true)
		setNewColor(randomHexColor())
	}
	function blurCell() {
		displayCellPopup(false)
		displayToolBar(false)
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