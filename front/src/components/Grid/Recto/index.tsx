import { useContext } from "react";
import { Style } from "./style";
import GridConnect from "./GridConnect";
import { Pages } from "../../../utils/enums";
import GridHome from "./GridHome";
import { GridContext } from "../../../contexts/GridContext";

function Recto() {

	const { flip, display, pageToDisplay } = useContext(GridContext)

	return (
		<Style $flip={flip} $display={display}>
			{
				pageToDisplay === Pages.SIGNIN || pageToDisplay === Pages.SIGNUP ?
					<GridConnect />
				: pageToDisplay === Pages.HOME ?
					<GridHome />
				:
				null
			}
		</Style>
	)
}

export default Recto