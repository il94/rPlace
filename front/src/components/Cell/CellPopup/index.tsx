import { useState } from "react";
import { CellPopupDisplay, CellType } from "../../../utils/types";
import { History, Style, WrapperBorder } from "./style";
import CellPopupData from "./CellPopupData";

type PropsCellPopup = {
	display: CellPopupDisplay,
	cellDatas: CellType
}

function CellPopup({ display, cellDatas }: PropsCellPopup) {

	const [open, setOpen] = useState(false)

	return (
		<Style
			onClick={(event) => event.stopPropagation()} 
			$top={display.top} $left={display.left} 
			$reverse={display.reverse}>
			<WrapperBorder>
				<CellPopupData color={cellDatas.color} />
				<History onClick={() => setOpen(!open)} $open={open}>
					{
						open &&
						<>
							<CellPopupData color={cellDatas.color} history />
							<CellPopupData color={cellDatas.color} history />
							<CellPopupData color={cellDatas.color} history />
							<CellPopupData color={cellDatas.color} history />
						</>
					}
					<p>{ open ? "Hidden" : "See" } history</p>
				</History>
			</WrapperBorder>
		</Style>
	)
}

export default CellPopup