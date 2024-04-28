import { Dispatch, SetStateAction, useContext, useEffect, useState } from "react"
import { CellType, GridType } from "../../utils/types"
import Cell from "../Cell"
import { Style } from "./style"
import { SocketContext } from "../../contexts/socket"
import { changeCellColor } from "../../utils/functions"
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch"
import DrawingBoard from "../DrawingBoard"

type PropsGrid = {
	grid: GridType,
	setGrid: Dispatch<SetStateAction<GridType>>
}
function Grid({ grid, setGrid }: PropsGrid) {

	const { socket } = useContext(SocketContext)

	useEffect(() => {
		socket.on("newColor", (cellId: number, newColor: string) =>
			changeCellColor(cellId, newColor, setGrid))
	}, [])

	return (
		<Style>
			<TransformWrapper disablePadding>
				<TransformComponent>
					<DrawingBoard>
						{
							grid.cells.map((cell: CellType, index: number) => 
								<Cell key={`cell_${index}`} cell={cell} setGrid={setGrid}  />
							)
						}
					</DrawingBoard>
				</TransformComponent>
			</TransformWrapper>
		</Style>
	)
}

export default Grid