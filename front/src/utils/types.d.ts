export type GridType = {
	id:		number,
	cells:	Cell[1600]
}

export type CellType = {
	id:			number,
	gridid:		number,
	color:		string
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

type User = {
	points: number,
	lastPut: Date | null
}

export type ErrorResponse = {
	error: string,
	message: string,
	statusCode: number
}