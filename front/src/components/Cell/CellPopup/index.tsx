import { useEffect, useState } from "react";
import { CellPopupDisplay, CellType, HistoryCell } from "../../../utils/types";
import { History, Style, WrapperBorder } from "./style";
import CellPopupData from "./CellPopupData";
import axios, { AxiosResponse } from "axios";

type PropsCellPopup = {
	display: CellPopupDisplay,
	cellDatas: CellType
}

function CellPopup({ display, cellDatas }: PropsCellPopup) {

	const [open, setOpen] = useState(false)
	const [history, setHistory] = useState<HistoryCell[]>([])

	useEffect(() => {
		async function fetchHistory() {
			const historyResponse: AxiosResponse<[]> = await axios.get(`${import.meta.env.VITE_URL_BACK}/cell/${cellDatas.id}/history`)

			setHistory(historyResponse.data)
		}
		fetchHistory()
	}, [cellDatas])

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
						{
							history.map((entry, index) => 
								<CellPopupData key={`cellpopupdata_${index}`} color={entry.color} history />
							)
						}
						</>
					}
					<p>{ open ? "Hidden" : "See" } history</p>
				</History>
			</WrapperBorder>
		</Style>
	)
}

export default CellPopup