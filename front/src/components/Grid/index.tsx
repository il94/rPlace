import { Dispatch, SetStateAction, useContext, useEffect, useState } from "react"
import { CellPopupDisplay, CellType, GridType, ToolbarDisplay } from "../../utils/types"
import Cell from "../Cell"
import { Recto, Style } from "./style"
import { SocketContext } from "../../contexts/socket"
import { changeAllCellsColor, changeCellColor, changeZoneCellColor } from "../../utils/functions"
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch"
import DrawingBoard from "../DrawingBoard"
import Toolbar from "../Toolbar"
import CellPopup from "../Cell/CellPopup"
import GridVerso from "./GridVerso"

type PropsGrid = {
	grid: GridType,
	setGrid: Dispatch<SetStateAction<GridType>>
}
function Grid({ grid, setGrid }: PropsGrid) {

	const { socket } = useContext(SocketContext)

	useEffect(() => {
		socket.on("pixelDrawed", (cellId: number, newColor: string) =>
			changeCellColor(cellId, newColor, setGrid))
		socket.on("bombUsed", (cellId: number, newColor: string) =>
			changeZoneCellColor(cellId, newColor, setGrid))
		socket.on("screenUsed", (newColor: string) =>
			changeAllCellsColor(newColor, setGrid))
	}, [])

	const [cellPopupDisplay, setCellPopupDisplay] = useState<CellPopupDisplay>({
		top: 0, left: 0, reverse: false
	})
	const [toolbarDisplay, setToolbarDisplay] = useState<ToolbarDisplay>({
		top: 0, left: 0
	})

	const [cellFocused, setCellFocused] = useState<CellType | null>(null)
	const [previousColor, setPreviousColor] = useState<string | null>(null)

	const [flip, setFlip] = useState(false)
	const [display, setDisplay] = useState(false)

	function flipGrid()
	{
		setFlip(!flip)
		setTimeout(() => {
			setDisplay(!display)
		}, 505)
	}

	return (
		<>
			<button onClick={flipGrid}>flip</button>
			<Style $flip={flip} >
				<Recto $flip={flip} $display={display}>
					<TransformWrapper disablePadding>
						<TransformComponent>
							<DrawingBoard>
								{
									cellFocused &&
									<CellPopup
										cellId={cellFocused.id}
										display={cellPopupDisplay} />
								}
								{
									cellFocused &&
									<Toolbar
										cellDatas={cellFocused}
										display={toolbarDisplay}
										setGrid={setGrid}
										previousColor={previousColor}
										setPreviousColor={setPreviousColor}
										setCellFocused={setCellFocused as Dispatch<SetStateAction<null>>}
									/>
								}
								{
									grid.cells.map((cell: CellType, index: number) =>
										<Cell
											key={`cell_${index}`}
											cell={cell}
											cellFocused={cellFocused}
											previousColor={previousColor}
											setCellFocused={setCellFocused}
											setCellPopupDisplay={setCellPopupDisplay}
											setToolbarDisplay={setToolbarDisplay}
										/>
									)
								}
							</DrawingBoard>
						</TransformComponent>
					</TransformWrapper>
				</Recto>
				<GridVerso flip={flip} display={display} flipGrid={flipGrid} />
			</Style>
		</>
	)
}

export default Grid