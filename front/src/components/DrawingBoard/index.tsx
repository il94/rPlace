import { useControls } from "react-zoom-pan-pinch";
import { Style } from "./style";
import { MouseEvent, ReactNode, useState } from "react";

type PropsDrawingBoard = {
	children: ReactNode
}

function DrawingBoard({ children }: PropsDrawingBoard) {

	const controls = useControls()
	const [startingPosition, setStartingPosition] = useState(0)

	function startDrag(event: MouseEvent) {
		setStartingPosition(event.clientX)
	}

	function zoomDrawingBoard(event: MouseEvent) {
		const cellTarget = event.target as HTMLElement
		
		if (event.clientX === startingPosition)
			controls.zoomToElement(cellTarget, 1.75)
	}

	return (
		<Style onMouseDown={startDrag} onClick={zoomDrawingBoard}>
			{children}
		</Style>
	)
}

export default DrawingBoard