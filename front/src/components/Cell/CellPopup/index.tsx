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
	const [history, setHistory] = useState<HistoryCell[] | null>(null)

	useEffect(() => {
		async function fetchHistory() {
			const historyResponse: AxiosResponse<HistoryCell[]> = await axios.get(`${import.meta.env.VITE_URL_BACK}/cell/${cellDatas.id}/history`, {
				withCredentials: true
			})

			setHistory(historyResponse.data)
		}
		fetchHistory()
	}, [cellDatas])

	return (
		<Style
			onClick={(event) => event.stopPropagation()} 
			$top={display.top} $left={display.left} 
			$reverse={display.reverse}>
			{
				history &&
				<WrapperBorder>
					<CellPopupData username={history[history.length - 1].username} color={cellDatas.color} />
					<History onClick={() => setOpen(!open)} $open={open}>
						{
							open &&
							<>
							{
								history.map((entry, index, array) => {
									if (index == array.length - 1)
										return
									else
										return (
											<CellPopupData
												key={`cellpopupdata_${index}`}
												username={entry.username}
												color={entry.color}
												history
											/>
										)
								})
							}
							</>
						}
						<p>{ open ? "Hidden" : "See" } history</p>
					</History>
				</WrapperBorder>
			}
		</Style>
	)
}

export default CellPopup