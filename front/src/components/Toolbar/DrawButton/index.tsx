import axios, { AxiosError } from "axios";
import { Page, Role, ToolsSet } from "../../../utils/enums";
import { Style } from "./style";
import { Dispatch, SetStateAction, useContext } from "react";
import { GridContext } from "../../../contexts/GridContext";
import { AuthContext } from "../../../contexts/AuthContext";
import Cookies from "js-cookie";
import { ErrorResponse, User } from "../../../utils/types";

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
			if (toolSelected === ToolsSet.PEN) {
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
					cooldown: (prevState.role === Role.ADMIN ? false : true)
				}))
			}
			else if (toolSelected === ToolsSet.BOMB) {
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
					wallet: (prevState.role === Role.ADMIN ? prevState.wallet : prevState.wallet - 15),
					lastPut: new Date(),
					cooldown: (prevState.role === Role.ADMIN ? false : true)
				}))
			}	
			else if (toolSelected === ToolsSet.SCREEN) {
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
					wallet: (prevState.role === Role.ADMIN ? prevState.wallet : prevState.wallet - 9999),
					lastPut: new Date(),
					cooldown: (prevState.role === Role.ADMIN ? false : true)
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
					flipGrid(Page.SIGNIN)
				}
			}
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