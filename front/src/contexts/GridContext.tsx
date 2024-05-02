import { createContext, Dispatch, ReactNode, SetStateAction, useState } from "react";
import { GridType } from "../utils/types";
import { Pages } from "../utils/enums";

export const GridContext = createContext<{
	grid: GridType | undefined,
	setGrid: Dispatch<SetStateAction<GridType | undefined>>,
	flipGrid: (page?: Pages) => void,
	flip: boolean,
	display: boolean,
	pageToDisplay: Pages,
	setPageToDisplay: Dispatch<SetStateAction<Pages>>
}>({
	grid: undefined,
	setGrid: () => {},
	flipGrid: () => {},
	flip: false,
	display: false,
	pageToDisplay: Pages.SIGNIN,
	setPageToDisplay: () => {}
})

function GridProvider({ children }: { children: ReactNode }) {

	function flipGrid(page?: Pages) {
		if (page)
			setPageToDisplay(page)

		setFlip(!flip)
		setTimeout(() => {
			setDisplay(!display)
		}, 505)
	}
	
	const [grid, setGrid] = useState<GridType | undefined>()

	const [flip, setFlip] = useState(false)
	const [display, setDisplay] = useState(false)

	const [pageToDisplay, setPageToDisplay] = useState<Pages>(Pages.SIGNIN)

	return (
		<GridContext.Provider value={{ grid, setGrid, flipGrid, flip, display, pageToDisplay, setPageToDisplay }}>
			{children}
		</GridContext.Provider>
	)
}

export default GridProvider