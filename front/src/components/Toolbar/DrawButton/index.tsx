import axios, { AxiosError } from "axios";
import { Pages, ToolsSet } from "../../../utils/enums";
import { Style } from "./style";
import { ErrorResponse, User } from "../../../utils/types";
import { Dispatch, SetStateAction, useContext } from "react";
import { GridContext } from "../../../contexts/GridContext";
import { AuthContext } from "../../../contexts/AuthContext";
import Cookies from "js-cookie";

type PropsDrawButton = {
	cellId: number,
	toolSelected: ToolsSet | null,
	newColor: string | null,
	setCellFocused: Dispatch<SetStateAction<null>>
}

function DrawButton({ cellId, toolSelected, newColor, setCellFocused }: PropsDrawButton) {

	const { userDatas, setUserDatas } = useContext(AuthContext)
	const { flipGrid } = useContext(GridContext)

	async function postNewColor(newColor: string) {
		try {
			if (toolSelected === ToolsSet.Pen) {
				await axios.post(`${import.meta.env.VITE_URL_BACK}/cell/${cellId}`, {
					newColor: newColor
				},
				{
					headers: {
						'Authorization': `Bearer ${Cookies.get("access_token")}`
					}
				})

				setUserDatas((prevState: User) => ({
					...prevState,
					wallet: prevState.wallet + 1,
					lastPut: new Date(),
					cooldown: true
				}))
			}
			else if (toolSelected === ToolsSet.Bomb) {
				await axios.post(`${import.meta.env.VITE_URL_BACK}/cell/${cellId}/zone`, {
					newColor: newColor
				},
				{
					headers: {
						'Authorization': `Bearer ${Cookies.get("access_token")}`
					}
				})
				setUserDatas((prevState: User) => ({
					...prevState,
					wallet: prevState.wallet - 15,
					lastPut: new Date(),
					cooldown: true
				}))
			}	
			else if (toolSelected === ToolsSet.Screen) {
				await axios.post(`${import.meta.env.VITE_URL_BACK}/cell/all`, {
					newColor: newColor
				},
				{
					headers: {
						'Authorization': `Bearer ${Cookies.get("access_token")}`
					}
				})
				setUserDatas((prevState: User) => ({
					...prevState,
					wallet: prevState.wallet - 9999,
					lastPut: new Date(),
					cooldown: true
				}))
			}
			setCellFocused(null)
		}
		catch (error) {
			if (axios.isAxiosError(error)) {
				const axiosError = error as AxiosError<ErrorResponse>
				const { statusCode, message } = axiosError.response?.data!
				if (statusCode === 401)
				{
					console.error(message)
					Cookies.remove("access_token")
					flipGrid(Pages.SIGNIN)
				}
			}
		}
	}

	return (
		<Style onClick={() => (newColor && !userDatas.cooldown) && postNewColor(newColor)} $available={(!!newColor && !userDatas.cooldown)}>
			{
				userDatas.cooldown ?
					"..."
				: toolSelected === ToolsSet.Pen ?
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