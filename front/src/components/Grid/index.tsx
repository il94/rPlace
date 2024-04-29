import { Dispatch, SetStateAction, useContext, useEffect, useState } from "react"
import { CellPopupType, CellType, GridType, ToolbarType } from "../../utils/types"
import Cell from "../Cell"
import { Style } from "./style"
import { SocketContext } from "../../contexts/socket"
import { changeCellColor } from "../../utils/functions"
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch"
import DrawingBoard from "../DrawingBoard"
import Toolbar from "../Toolbar"
import CellPopup from "../Cell/CellPopup"

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

	const [cellPopup, displayCellPopup] = useState<CellPopupType>({
		display: false
	})
	const [toolbar, displayToolbar] = useState<ToolbarType>({
		display: false
	})


	return (
		<Style>
			<TransformWrapper disablePadding>
				<TransformComponent>
					<DrawingBoard>
						{ cellPopup && <CellPopup cellPopup={cellPopup} /> }
						{ toolbar.display && <Toolbar toolbar={toolbar} /> }
						{
							grid.cells.map((cell: CellType, index: number) => 
								<Cell
									key={`cell_${index}`}
									cell={cell}
									setGrid={setGrid}
									displayCellPopup={displayCellPopup}
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