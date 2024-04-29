import { Dispatch, SetStateAction, useContext, useEffect, useState } from "react"
import { CellType, GridType, StatePosition } from "../../utils/types"
import Cell from "../Cell"
import { Style } from "./style"
import { SocketContext } from "../../contexts/socket"
import { changeCellColor } from "../../utils/functions"
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch"
import DrawingBoard from "../DrawingBoard"
import Toolbar from "../Toolbar"

type PropsGrid = {
	grid: GridType,
	setGrid: Dispatch<SetStateAction<GridType>>
}
function Grid({ grid, setGrid }: PropsGrid) {

	const { socket } = useContext(SocketContext)
	const [toolbar, displayToolbar] = useState<StatePosition>({
		display: false
	})

	useEffect(() => {
		socket.on("newColor", (cellId: number, newColor: string) =>
			changeCellColor(cellId, newColor, setGrid))
 	}, [])

	return (
		<Style>
			<TransformWrapper disablePadding>
				<TransformComponent>
					<DrawingBoard>
						{ toolbar.display && <Toolbar toolbar={toolbar} /> }
						{
							grid.cells.map((cell: CellType, index: number) => 
								<Cell
									key={`cell_${index}`}
									cell={cell}
									setGrid={setGrid}
									displayToolBar={displayToolbar}
								/>
							)
						}
					</DrawingBoard>
				</TransformComponent>
			</TransformWrapper>
		</Style>
	)
}

export default Grid