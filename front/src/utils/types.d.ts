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

export type HistoryCell = {
	id:		number,
	color:	string
}

type CellPopupDisplay = {
	top:		number,
	left:		number,
	reverse:	boolean
}

type ToolbarDisplay = {
	top:	number,
	left:	number
}