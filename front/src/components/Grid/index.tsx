import { Dispatch, MouseEvent, SetStateAction, useContext, useEffect, useRef, useState } from "react"
import { CellType, GridType } from "../../utils/types"
import Cell from "../Cell"
import { DrawingBoard, Style } from "./style"
import { SocketContext } from "../../contexts/socket"
import { changeCellColor } from "../../utils/functions"

type PropsGrid = {
	grid: GridType,
	setGrid: Dispatch<SetStateAction<GridType>>,
	$zoom: boolean
}
function Grid({ grid, setGrid, $zoom }: PropsGrid) {

	const { socket } = useContext(SocketContext)

	useEffect(() => {
		socket.on("newColor", (cellId: number, newColor: string) => changeCellColor(cellId, newColor, setGrid))
	}, [])

	const [dragging, setDragging] = useState(false)
	const [offsetX, setOffsetX] = useState(0)
	const [offsetY, setOffsetY] = useState(0)
	const StyleRef = useRef<HTMLDivElement>(null)

	function moveDrawingBoard(event: MouseEvent<HTMLDivElement>) {

		const StyleContainer = StyleRef.current

		if (dragging && StyleContainer) 
		{
			const left = StyleContainer.getBoundingClientRect().left
			const top = StyleContainer.getBoundingClientRect().top
			const clicPositionX = event.clientX - left
			const clicPositionY = event.clientY - top

			StyleContainer.scrollLeft = -(clicPositionX - offsetX)
			StyleContainer.scrollTop = -(clicPositionY - offsetY)
		}
	}

	function startDrag(event: MouseEvent) {

		const StyleContainer = StyleRef.current
		if (StyleContainer) {

			const left = StyleContainer.getBoundingClientRect().left
			const top = StyleContainer.getBoundingClientRect().top
			const clicPositionX = event.clientX - left
			const clicPositionY = event.clientY - top

			setOffsetX(clicPositionX + StyleContainer.scrollLeft)
			setOffsetY(clicPositionY + StyleContainer.scrollTop)

			setDragging(true)
		}
	}
	function stopDrag() {
		setDragging(false)		
	}

	return (
		<Style
			onMouseMove={moveDrawingBoard} onMouseDown={startDrag}
			onMouseUp={stopDrag} onMouseLeave={stopDrag}
			ref={StyleRef}>
			<DrawingBoard $zoom={$zoom}>
				{
					grid.cells.map((cell: CellType, index: number) => 
						<Cell key={`cell_${index}`} cell={cell} setGrid={setGrid}  />
					)
				}
			</DrawingBoard>
		</Style>
	)
}

export default Grid