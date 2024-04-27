import { Dispatch, SetStateAction } from "react"
import { CellType, GridType } from "./types"

export function randomHexColor(): string {
	const randomColor = Math.floor(Math.random() * 16777215).toString(16)
	return "#" + ("000000" + randomColor).slice(-6)
}



export function changeCellColor(cellId: number, newColor: string, setGrid: Dispatch<SetStateAction<GridType>>) {

	setGrid((prevState: GridType) => {
		return ({
			...prevState,
			cells: prevState.cells.map((cell: CellType) => {
				if (cell.id === cellId) {
					return ({
						...cell,
						color: newColor
					})
				}
				else {
					return cell
				}
			})
		})
	})
}
