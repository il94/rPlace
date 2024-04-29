import axios from "axios";
import { ColorsSet, ToolsSet } from "../../utils/enums";
import { CellType, GridType, ToolbarDisplay } from "../../utils/types";
import ToolbarColor from "./ToolbarColor";
import { Colors, DrawButton, Interfaces, Style, Tools } from "./style";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import PenIcon from "../../../src/assets/pen.svg"
import BombIcon from "../../../src/assets/bomb.svg"
import ScreenIcon from "../../../src/assets/screen.svg"
import Tool from "./Tool";

type PropsToolbar = {
	cellDatas: CellType,
	display: ToolbarDisplay,
	setGrid: Dispatch<SetStateAction<GridType>>,
	previousColor: ColorsSet | null,
	setPreviousColor: Dispatch<SetStateAction<ColorsSet | null>>
}
function Toolbar({ cellDatas, display, previousColor, setPreviousColor }: PropsToolbar) {

	const [toolSelected, setToolSelected] = useState<ToolsSet | null>(ToolsSet.Pen)

	async function postNewColor(newColor: string) {
		try {
			if (toolSelected === ToolsSet.Pen) {
				await axios.post(`${import.meta.env.VITE_URL_BACK}/cell/${cellDatas.id}`, {
					newColor: newColor
				})
			}
			else if (toolSelected === ToolsSet.Bomb) {
				await axios.post(`${import.meta.env.VITE_URL_BACK}/cell/${cellDatas.id}/zone`, {
					newColor: newColor
				})
			}	
			else if (toolSelected === ToolsSet.Screen) {
				await axios.post(`${import.meta.env.VITE_URL_BACK}/cell/all`, {
					newColor: newColor
				})
			}
		}
		catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		setPreviousColor(null)
	}, [cellDatas])

	return (
		<Style
			onClick={(event) => event.stopPropagation()}
			$top={display.top} $left={display.left}>
			<Interfaces>
				<Colors>
				{
					Object.keys(ColorsSet).map((key: string) =>
						<ToolbarColor
							key={`toolbarcolor_${key}`}
							setPreviousColor={setPreviousColor}
							color={ColorsSet[key]}
						/>)
				}
				</Colors>
				<Tools>
					<Tool tool={ToolsSet.Pen} icon={PenIcon} price={0} toolSelected={toolSelected} setToolSelected={setToolSelected} />
					<Tool tool={ToolsSet.Bomb} icon={BombIcon} price={10} toolSelected={toolSelected} setToolSelected={setToolSelected} />
					<Tool tool={ToolsSet.Screen} icon={ScreenIcon} price={10000} toolSelected={toolSelected} setToolSelected={setToolSelected} />
				</Tools>
				{
					// previousColor &&
					<DrawButton onClick={() => postNewColor(previousColor)}>
						Valider
					</DrawButton>
				}
			</Interfaces>
		</Style>
	)
}

export default Toolbar