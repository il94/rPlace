export type GridType = {
	id:		number,
	cells:	Cell[1600]
}

export type CellType = {
	id:			number,
	gridid:		number,
	color:		string,
	username:	string
}

export type HistoryCell = {
	color:		string,
	username:	string
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