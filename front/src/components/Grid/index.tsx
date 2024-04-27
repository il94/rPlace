import { Dispatch, SetStateAction, useContext, useEffect } from "react"
import { CellType, GridType } from "../../utils/types"
import Cell from "../Cell"
import { Style } from "./style"
import { SocketContext } from "../../contexts/socket"
import { changeCellColor } from "../../utils/functions"

type PropsGrid = {
	grid: GridType,
	setGrid: Dispatch<SetStateAction<GridType>>
}
function Grid({ grid, setGrid }: PropsGrid) {

	const { socket } = useContext(SocketContext)

	useEffect(() => {
		socket.on("newColor", (cellId: number, newColor: string) => changeCellColor(cellId, newColor, setGrid))
	}, [])

	return (
		<Style>
			{
				grid.cells.map((cell: CellType, index: number) => 
					<Cell key={`cell_${index}`} cell={cell} setGrid={setGrid} />
				)
			}
		</Style>
	)
}

export default Grid