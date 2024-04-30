import { Dispatch, MouseEvent, SetStateAction } from "react";
import { Style } from "./style";
import { CellPopupDisplay, CellType, ToolbarDisplay } from "../../utils/types";
import { useControls } from "react-zoom-pan-pinch";
import { ColorsSet } from "../../utils/enums";

type PropsCell = {
	cell: CellType,
	cellFocused: CellType | null,
	previousColor: ColorsSet | null,
	setCellFocused: Dispatch<SetStateAction<CellType | null>>,
	setCellPopupDisplay: Dispatch<SetStateAction<CellPopupDisplay>>,
	setToolbarDisplay: Dispatch<SetStateAction<ToolbarDisplay>>
}

function Cell({ cell, cellFocused, previousColor, setCellFocused, setCellPopupDisplay, setToolbarDisplay }: PropsCell) {

	const controls = useControls()

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

		setCellPopupDisplay({
			top: resultCellPopupY,
			left: resultCellPopupX,
			reverse: reverseCellPopup
		})
		setToolbarDisplay({
			top: resultToolbarY,
			left: resultToolbarX,
		})

		setCellFocused(cell)
	}
	function blurCell() {
		setCellFocused(null)
	}

	return (
		<>
			<Style onClick={focusCell} onBlur={blurCell}
				tabIndex={0} $backgroundColor={(previousColor && cellFocused?.id === cell.id ) ? previousColor : cell.color[cell.color.length -1]}>
			</Style>
		</>
	)
}

export default Cell