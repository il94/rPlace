import axios, { AxiosError } from "axios";
import { Pages, ToolsSet } from "../../../utils/enums";
import { Style } from "./style";
import { ErrorResponse, User } from "../../../utils/types";
import { Dispatch, SetStateAction, useContext } from "react";
import { GridContext } from "../../../contexts/GridContext";

type PropsDrawButton = {
	cellId: number,
	toolSelected: ToolsSet | null,
	newColor: string | null,
	setUserDatas: Dispatch<SetStateAction<User>>,
	setCellFocused: Dispatch<SetStateAction<null>>
}

function DrawButton({ cellId, toolSelected, newColor, setUserDatas, setCellFocused }: PropsDrawButton) {

	const { flipGrid } = useContext(GridContext)

	async function postNewColor(newColor: string) {
		try {
			if (toolSelected === ToolsSet.Pen) {
				await axios.post(`${import.meta.env.VITE_URL_BACK}/cell/${cellId}`, {
					newColor: newColor
				},
				{
					withCredentials: true
				})
				setUserDatas((prevState: User) => ({
					points: prevState.points + 1,
					lastPut: new Date()
				}))
			}
			else if (toolSelected === ToolsSet.Bomb) {
				await axios.post(`${import.meta.env.VITE_URL_BACK}/cell/${cellId}/zone`, {
					newColor: newColor
				},
				{
					withCredentials: true
				})
				setUserDatas((prevState: User) => ({
					points: prevState.points - 15,
					lastPut: new Date()
				}))
			}	
			else if (toolSelected === ToolsSet.Screen) {
				await axios.post(`${import.meta.env.VITE_URL_BACK}/cell/all`, {
					newColor: newColor
				},
				{
					withCredentials: true
				})
				setUserDatas((prevState: User) => ({
					points: prevState.points - 9999,
					lastPut: new Date()
				}))
			}
			setCellFocused(null)
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

	return (
		<Style onClick={() => newColor && postNewColor(newColor)} $available={!!newColor}>
			{
				toolSelected === ToolsSet.Pen ?
					"Draw !"
				: toolSelected === ToolsSet.Bomb ?
					"BOOM !"
				: toolSelected === ToolsSet.Screen ?
					"WTF"
				: null
			}
		</Style>
	)
}

export default DrawButton