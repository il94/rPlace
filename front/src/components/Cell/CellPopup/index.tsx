import { useState } from "react";
import { CellType } from "../../../utils/types";
import { History, Style, WrapperBorder } from "./style";
import CellPopupData from "./CellPopupData";

type PropsCellPopup = {
	cell: CellType
}

function CellPopup({ cell }: PropsCellPopup) {

	const [open, setOpen] = useState(false)

	return (
		<Style onClick={(event) => event.stopPropagation()}>
			<WrapperBorder>
				<CellPopupData color={cell.color} />
				<History onClick={() => setOpen(!open)} $open={open}>
					{
						open &&
						<>
							<CellPopupData color={cell.color} history />
							<CellPopupData color={cell.color} history />
							<CellPopupData color={cell.color} history />
							<CellPopupData color={cell.color} history />
						</>
					}
					<p>{open ? "Hidden" : "See"} history</p>
				</History>
			</WrapperBorder>
		</Style>
	)
}

export default CellPopup