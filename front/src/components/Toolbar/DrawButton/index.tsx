import axios from "axios";
import { ToolsSet } from "../../../utils/enums";
import { Style } from "./style";
import { User } from "../../../utils/types";
import { Dispatch, SetStateAction } from "react";

type PropsDrawButton = {
	cellId: number,
	toolSelected: ToolsSet | null,
	newColor: string | null,
	setUserDatas: Dispatch<SetStateAction<User>>,
	setCellFocused: Dispatch<SetStateAction<null>>
}

function DrawButton({ cellId, toolSelected, newColor, setUserDatas, setCellFocused }: PropsDrawButton) {

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
			console.log(error)
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