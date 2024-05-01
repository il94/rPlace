import { useContext, useEffect, useState } from "react";
import { CellPopupDisplay, ErrorResponse, HistoryCell } from "../../../utils/types";
import { History, Style, WrapperBorder } from "./style";
import CellPopupData from "./CellPopupData";
import axios, { AxiosError, AxiosResponse } from "axios";
import { GridContext } from "../../../contexts/GridContext";

type PropsCellPopup = {
	display: CellPopupDisplay,
	cellId: number
}

function CellPopup({ display, cellId }: PropsCellPopup) {

	const { flipGrid } = useContext(GridContext)

	useEffect(() => {
		async function fetchHistory() {
			try {
				const historyResponse: AxiosResponse<HistoryCell[]> = await axios.get(`${import.meta.env.VITE_URL_BACK}/cell/${cellId}/history`, {
					withCredentials: true
				})
				
				setHistory(historyResponse.data)
			}
			catch (error) {
				if (axios.isAxiosError(error)) {
					const axiosError = error as AxiosError<ErrorResponse>
					const { statusCode } = axiosError.response?.data!
					if (statusCode === 401)
						flipGrid()
				}
			}
		}
		fetchHistory()
	}, [cellId])

	const [open, setOpen] = useState(false)
	const [history, setHistory] = useState<HistoryCell[] | null>(null)

	return (
		<Style
			onClick={(event) => event.stopPropagation()} 
			$top={display.top} $left={display.left} 
			$reverse={display.reverse}>
			{
				history &&
				<WrapperBorder>
					<CellPopupData username={history[history.length - 1].username} color={history[history.length - 1].color} />
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