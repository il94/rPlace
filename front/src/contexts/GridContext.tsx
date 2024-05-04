import { createContext, Dispatch, ReactNode, SetStateAction, useState } from "react";
import { Page } from "../utils/enums";
import { GridType } from "../utils/types";

export const GridContext = createContext<{
	grid: GridType | undefined,
	setGrid: Dispatch<SetStateAction<GridType | undefined>>,
	flipGrid: (page?: Page) => void,
	flip: boolean,
	display: boolean,
	pageToDisplay: Page,
	setPageToDisplay: Dispatch<SetStateAction<Page>>
}>({
	grid: undefined,
	setGrid: () => {},
	flipGrid: () => {},
	flip: false,
	display: false,
	pageToDisplay: Page.SIGNIN,
	setPageToDisplay: () => {}
})

function GridProvider({ children }: { children: ReactNode }) {

	function flipGrid(page?: Page) {
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

	const [pageToDisplay, setPageToDisplay] = useState<Page>(Page.SIGNIN)

	return (
		<GridContext.Provider value={{ grid, setGrid, flipGrid, flip, display, pageToDisplay, setPageToDisplay }}>
			{children}
		</GridContext.Provider>
	)
}

export default GridProvider