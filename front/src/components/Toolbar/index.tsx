import axios from "axios";
import { ColorsSet } from "../../utils/enums";
import { CellType, GridType, ToolbarDisplay } from "../../utils/types";
import ToolbarColor from "./ToolbarColor";
import { Colors, Interfaces, Style } from "./style";
import { Dispatch, SetStateAction, useEffect } from "react";

type PropsToolbar = {
	cellDatas: CellType,
	display: ToolbarDisplay,
	setGrid: Dispatch<SetStateAction<GridType>>,
	previousColor: ColorsSet | null,
	setPreviousColor: Dispatch<SetStateAction<ColorsSet | null>>
}
function Toolbar({ cellDatas, display, previousColor, setPreviousColor }: PropsToolbar) {

	async function postNewColor(newColor: string) {
		await axios.post(`${import.meta.env.VITE_URL_BACK}/cell/${cellDatas.id}/color`, {
			newColor: newColor
		})
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
				{
					previousColor &&
					<button onClick={() => postNewColor(previousColor)}>
						Valider
					</button>
				}
			</Interfaces>
		</Style>
	)
}

export default Toolbar