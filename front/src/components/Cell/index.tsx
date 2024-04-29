import { Dispatch, MouseEvent, SetStateAction } from "react";
import { Style } from "./style";
import { CellPopupType, CellType, ToolbarType } from "../../utils/types";
import axios from "axios";
import { randomHexColor } from "../../utils/functions";
import { useControls } from "react-zoom-pan-pinch";

type PropsCell = {
	cell: CellType,
	displayCellPopup: Dispatch<SetStateAction<CellPopupType>>,
	displayToolBar: Dispatch<SetStateAction<ToolbarType>>,
}

function Cell({ cell, displayCellPopup, displayToolBar }: PropsCell) {

	const controls = useControls()

	async function setNewColor(newColor: string) {
		await axios.post(`${import.meta.env.VITE_URL_BACK}/cell/${cell.id}/color`, {
			newColor: newColor
		})
	}

	function focusCell(event: MouseEvent<HTMLDivElement>) {

		const target = event.target as HTMLElement		
		const gridDatas = target.parentElement!.parentElement!.parentElement!.getBoundingClientRect()

		target.focus()

		/* =========== X AXE =========== */

		const clickX = controls.instance.startCoords!.x - gridDatas.left

		let resultCellPopupX = clickX / controls.instance.transformState.scale - 150 / 2
		let resultToolbarX = clickX / controls.instance.transformState.scale - (300 / 2)

		if (resultCellPopupX >= 560 - 150)
			resultCellPopupX = 560 - 155
		else if (resultCellPopupX < 0)
			resultCellPopupX = 5
	
		if (resultToolbarX >= 560 - 300)
			resultToolbarX = 560 - 305
		else if (resultToolbarX < 0)
			resultToolbarX = 5

		/* =========== Y AXE =========== */

		const clickY = controls.instance.startCoords!.y - gridDatas.top

		let resultCellPopupY = clickY / controls.instance.transformState.scale - 16
		let reverseCellPopup = false
		let resultToolbarY = clickY / controls.instance.transformState.scale + 40

		if (resultCellPopupY < 70)
		{
			resultCellPopupY += 32.5
			resultToolbarY += 50

			reverseCellPopup = true
		}
		if (resultToolbarY >= 560 - 40)
			resultToolbarY -= 170

		displayCellPopup({
			display: true,
			cellDatas: cell,
			top: resultCellPopupY,
			left: resultCellPopupX,
			reverse: reverseCellPopup
		})

		displayToolBar({
			display: true,
			top: resultToolbarY,
			left: resultToolbarX,
		})

		setNewColor(randomHexColor())
	}
	function blurCell() {
		displayCellPopup({ display: false })
		displayToolBar({ display: false })
	}

	return (
		<>
			<Style onClick={focusCell} onBlur={blurCell}
				tabIndex={0} $backgroundColor={cell.color}>
			</Style>
		</>
	)
}

export default Cell