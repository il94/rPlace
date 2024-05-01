import { useState } from "react";
import { Style } from "./style";
import GridConnect from "./GridConnect";
import { Pages } from "../../../utils/enums";
import GridHome from "./GridHome";

type PropsGridVerso = {
	flip: boolean,
	display: boolean,
	flipGrid: () => void
}
function GridVerso({ flip, display, flipGrid }: PropsGridVerso) {

	const [pageToDisplay, setPageToDisplay] = useState<Pages>(Pages.LOGOUT)

	return (
		<Style $flip={flip} $display={display}>
			{
				pageToDisplay === Pages.SIGNIN || pageToDisplay === Pages.SIGNUP ?
				<GridConnect pageToDisplay={pageToDisplay} setPageToDisplay={setPageToDisplay}/>
				: pageToDisplay === Pages.LOGOUT ?
				<GridHome flipGrid={flipGrid} setPageToDisplay={setPageToDisplay} />
				:
				null
			}
		</Style>
	)
}

export default GridVerso