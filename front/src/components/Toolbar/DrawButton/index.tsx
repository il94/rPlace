import axios, { AxiosError } from "axios";
import { Page, Role, ToolsSet } from "../../../utils/enums";
import { Style } from "./style";
import { Dispatch, SetStateAction, useContext } from "react";
import { GridContext } from "../../../contexts/GridContext";
import { AuthContext } from "../../../contexts/AuthContext";
import Cookies from "js-cookie";
import { ErrorResponse, User } from "../../../utils/types";
import { AxiosHeaders, config } from "../../../utils/config";

type PropsDrawButton = {
	cellId: number,
	toolSelected: ToolsSet | null,
	newColor: string | null,
	setCellFocused: Dispatch<SetStateAction<null>>
}

function DrawButton({ cellId, toolSelected, newColor, setCellFocused }: PropsDrawButton) {

	function setNewWallet(role: Role, toolUsed: ToolsSet | null, prevWallet: number): number {
		if (role === Role.ADMIN)
			return (prevWallet)
		if (toolUsed === ToolsSet.PEN)
			return (prevWallet + config.penGive)
		else if (toolUsed === ToolsSet.BOMB)
			return (prevWallet - config.bombPrice)
		else if (toolUsed === ToolsSet.SCREEN)
			return (prevWallet - config.screenPrice)
		else
			return (0)
	}

	const { userDatas, setUserDatas } = useContext(AuthContext)
	const { flipGrid } = useContext(GridContext)

	async function postNewColor(newColor: string) {
		try {
			if (toolSelected === ToolsSet.PEN) {
				await axios.post(`${import.meta.env.VITE_URL_BACK}/cell/${cellId}`, {
					newColor: newColor
				}, new AxiosHeaders())
			}
			else if (toolSelected === ToolsSet.BOMB) {
				await axios.post(`${import.meta.env.VITE_URL_BACK}/cell/${cellId}/zone`, {
					newColor: newColor
				}, new AxiosHeaders())
			}	
			else if (toolSelected === ToolsSet.SCREEN) {
				await axios.post(`${import.meta.env.VITE_URL_BACK}/cell/all`, {
					newColor: newColor
				}, new AxiosHeaders())
			}

			setUserDatas((prevState: User) => ({
				...prevState,
				wallet: setNewWallet(prevState.role, toolSelected, prevState.wallet),
				lastPut: new Date(),
				cooldown: (prevState.role === Role.ADMIN ? false : true)
			}))

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
					flipGrid(Page.SIGNIN)
				}
			}
			else
				console.error(error)
		}
	}

	return (
		<Style onClick={() => (newColor && (!userDatas.cooldown || userDatas.role === Role.ADMIN)) && postNewColor(newColor)} $available={(!!newColor && !userDatas.cooldown) || userDatas.role === Role.ADMIN}>
			{
				userDatas.role === Role.ADMIN ?
					"YOLO"
				: userDatas.cooldown ?
					"..."
				: toolSelected === ToolsSet.PEN ?
					"Draw !"
				: toolSelected === ToolsSet.BOMB ?
					"BOOM !"
				: toolSelected === ToolsSet.SCREEN ?
					"WTF"
				: null
			}
		</Style>
	)
}

export default DrawButton