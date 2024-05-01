import { createContext, Dispatch, ReactNode, SetStateAction, useState } from "react";
import { GridType } from "../utils/types";
import { Pages } from "../utils/enums";

export const GridContext = createContext<{
	grid: GridType | undefined,
	setGrid: Dispatch<SetStateAction<GridType | undefined>>,
	flipGrid: () => void,
	flip: boolean,
	display: boolean,
	pageToDisplay: Pages,
	setPageToDisplay: Dispatch<SetStateAction<Pages>>,
	switchPage: () => void
}>({
	grid: undefined,
	setGrid: () => {},
	flipGrid: () => {},
	flip: false,
	display: false,
	pageToDisplay: Pages.SIGNIN,
	setPageToDisplay: () => {},
	switchPage: () => {}
})

function GridProvider({ children }: { children: ReactNode }) {

	function switchPage() {
		if (pageToDisplay === Pages.SIGNIN)
			setPageToDisplay(Pages.SIGNUP)
		else
			setPageToDisplay(Pages.SIGNIN)
	}	

	const [grid, setGrid] = useState<GridType | undefined>()

	const [flip, setFlip] = useState(false)
	const [display, setDisplay] = useState(false)

	const [pageToDisplay, setPageToDisplay] = useState<Pages>(Pages.SIGNIN)

	function flipGrid()
	{
		setFlip(!flip)
		setTimeout(() => {
			setDisplay(!display)
		}, 505)
	}

	return (
		<GridContext.Provider value={{ grid, setGrid, flipGrid, flip, display, pageToDisplay, setPageToDisplay, switchPage }}>
			{children}
		</GridContext.Provider>
	)
}

export default GridProvider