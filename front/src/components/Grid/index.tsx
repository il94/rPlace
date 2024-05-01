import { Dispatch, SetStateAction, useContext, useEffect, useState } from "react"
import { CellPopupDisplay, CellType, GridType, ToolbarDisplay, User } from "../../utils/types"
import Cell from "../Cell"
import { Verso, Style } from "./style"
import { SocketContext } from "../../contexts/SocketContext"
import { changeAllCellsColor, changeCellColor, changeZoneCellColor } from "../../utils/functions"
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch"
import DrawingBoard from "../DrawingBoard"
import Toolbar from "../Toolbar"
import CellPopup from "../Cell/CellPopup"
import Recto from "./Recto"
import axios from "axios"
import { GridContext } from "../../contexts/GridContext"

function Grid() {

	const { grid, setGrid, flipGrid, flip, display } = useContext(GridContext)

	useEffect(() => {

		async function verifyToken() {
			try {
				await axios.get(`${import.meta.env.VITE_URL_BACK}/auth`, {
					withCredentials: true
				})

				flipGrid()
			}
			catch (error) {
				console.log("Session expiree", error)
			}
		}

		verifyToken()
	}, [])

	const { socket } = useContext(SocketContext)

	useEffect(() => {
		socket.on("pixelDrawed", (cellId: number, newColor: string) =>
			changeCellColor(cellId, newColor, setGrid as Dispatch<SetStateAction<GridType>>))
		socket.on("bombUsed", (cellId: number, newColor: string) =>
			changeZoneCellColor(cellId, newColor, setGrid as Dispatch<SetStateAction<GridType>>))
		socket.on("screenUsed", (newColor: string) =>
			changeAllCellsColor(newColor, setGrid as Dispatch<SetStateAction<GridType>>))
	}, [])

	const [cellPopupDisplay, setCellPopupDisplay] = useState<CellPopupDisplay>({
		top: 0, left: 0, reverse: false
	})
	const [toolbarDisplay, setToolbarDisplay] = useState<ToolbarDisplay>({
		top: 0, left: 0
	})

	const [cellFocused, setCellFocused] = useState<CellType | null>(null)
	const [newColor, setNewColor] = useState<string | null>(null)

	const [userDatas, setUserDatas] = useState<User>({
		points: 0, lastPut: null
	})

	return (
		<Style $flip={flip} >
			<Recto />
			<Verso $flip={flip} $display={display}>
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
									userDatas={userDatas}
									setUserDatas={setUserDatas}
									display={toolbarDisplay}
									newColor={newColor}
									setNewColor={setNewColor}
									setCellFocused={setCellFocused as Dispatch<SetStateAction<null>>}
								/>
							}
							{
								grid && grid.cells.map((cell: CellType, index: number) =>
									<Cell
										key={`cell_${index}`}
										cell={cell}
										cellFocused={cellFocused}
										newColor={newColor}
										setCellFocused={setCellFocused}
										setCellPopupDisplay={setCellPopupDisplay}
										setToolbarDisplay={setToolbarDisplay}
									/>
								)
							}
						</DrawingBoard>
					</TransformComponent>
				</TransformWrapper>
			</Verso>

		</Style>
	)
}

export default Grid