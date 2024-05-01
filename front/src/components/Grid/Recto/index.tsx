import { useState } from "react";
import { Style } from "./style";
import GridConnect from "./GridConnect";
import { Pages } from "../../../utils/enums";
import GridHome from "./GridHome";

type PropsRecto = {
	flip: boolean,
	display: boolean,
	flipGrid: () => void
}
function Recto({ flip, display, flipGrid }: PropsRecto) {

	const [pageToDisplay, setPageToDisplay] = useState<Pages>(Pages.SIGNIN)

	return (
		<Style $flip={flip} $display={display}>
			{
				pageToDisplay === Pages.SIGNIN || pageToDisplay === Pages.SIGNUP ?
				<GridConnect pageToDisplay={pageToDisplay} setPageToDisplay={setPageToDisplay}/>
				: pageToDisplay === Pages.HOME ?
				<GridHome flipGrid={flipGrid} setPageToDisplay={setPageToDisplay} />
				:
				null
			}
		</Style>
	)
}

export default Recto