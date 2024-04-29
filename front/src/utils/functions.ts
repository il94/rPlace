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

export function changeZoneCellColor(cellId: number, newColor: string, setGrid: Dispatch<SetStateAction<GridType>>) {
	const zone: number[] = drawCircle(cellId, 11)

	setGrid((prevState: GridType) => {
		return ({
			...prevState,
			cells: prevState.cells.map((cell: CellType) => {
				if (zone.includes(cell.id)) {
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

export function changeAllCellsColor(newColor: string, setGrid: Dispatch<SetStateAction<GridType>>) {

	setGrid((prevState: GridType) => {
		return ({
			...prevState,
			cells: prevState.cells.map((cell: CellType) => {
				return ({
					...cell,
					color: newColor
				})
			})
		})
	})
}

function drawCircle(start: number, size: number): number[] {
	function getIndexLine(position: number) {
		return (Math.floor(position / 40))
	}
	function getIndexColumn(position: number) {
		if (position % 40 === 0)
			return 40
		return (Math.floor(position % 40))
	}

	function distance(x1: number, y1: number, x2: number, y2: number) {
		return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))
	}

	const centerX = getIndexColumn(start)
	const centerY = getIndexLine(start)

	const results = []

	for (let i = 0; i < size; i++) {
		for (let j = 0; j < size; j++) {
			const y = centerY - Math.floor(size / 2) + i
			const x = centerX - Math.floor(size / 2) + j
			if ((y <= 40 && y >= 0) && (x <= 40 && x >= 1) &&
				(distance(centerX, centerY, x, y) <= size / 2))
			{
				const result = y * 40 + x
				results.push(result)
			}
		}
	}

	return (results)
}
