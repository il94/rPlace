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