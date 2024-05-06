type AuthType = {
	user: Partial<User>,
	token: string
}

type CellOnGrid = {	
	history: {
		id: number,
		cellId: number,
		username: string,
		role: Role,
		color: string,
		createdAt: Date
	}[],
	id: number
}