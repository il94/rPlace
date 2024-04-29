import { useState } from "react";
import { CellPopupType } from "../../../utils/types";
import { History, Style, WrapperBorder } from "./style";
import CellPopupData from "./CellPopupData";

type PropsCellPopup = {
	cellPopup: CellPopupType
}

function CellPopup({ cellPopup }: PropsCellPopup) {

	const [open, setOpen] = useState(false)

	return (
		cellPopup.display && cellPopup.cellDatas &&
		<Style
			onClick={(event) => event.stopPropagation()} 
			$top={cellPopup.top} $left={cellPopup.left} 
			$reverse={cellPopup.reverse}>
			<WrapperBorder>
				<CellPopupData color={cellPopup.cellDatas.color} />
				<History onClick={() => setOpen(!open)} $open={open}>
					{
						open &&
						<>
							<CellPopupData color={cellPopup.cellDatas.color} history />
							<CellPopupData color={cellPopup.cellDatas.color} history />
							<CellPopupData color={cellPopup.cellDatas.color} history />
							<CellPopupData color={cellPopup.cellDatas.color} history />
						</>
					}
					<p>{open ? "Hidden" : "See"} history</p>
				</History>
			</WrapperBorder>
		</Style>
	)
}

export default CellPopup