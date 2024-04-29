export type GridType = {
	id:		number,
	cells:	Cell[1600]
}

export type CellType = {
	id:			number,
	gridid:		number,
	idOnGrid:	number,
	color:		string
}

type CellPopupType = {
	display: boolean,
	cellDatas?: CellType,
	top?: number,
	left?: number,
	reverse?: boolean
}

type ToolbarType = {
	display: boolean,
	top?: number,
	left?: number
}