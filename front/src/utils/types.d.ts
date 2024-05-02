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
	username: string,
	wallet: number,
	lastPut: Date | null,
	cooldown: boolean,
}

export type ErrorResponse = {
	error: string,
	message: string,
	statusCode: number
}