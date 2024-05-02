import { ToolsSet } from "../../utils/enums";
import { CellType, ToolbarDisplay } from "../../utils/types";
import ToolbarColor from "./ToolbarColor";
import { Colors, Interfaces, Style, Tools, Wallet } from "./style";
import { Dispatch, SetStateAction, useContext, useState } from "react";
import PenIcon from "../../../src/assets/pen.svg"
import BombIcon from "../../../src/assets/bomb.svg"
import ScreenIcon from "../../../src/assets/screen.svg"
import Tool from "./Tool";
import colors from "../../utils/colors";
import CoinIcon from "../../assets/coin.png"
import DrawButton from "./DrawButton";
import { AuthContext } from "../../contexts/AuthContext";

type PropsToolbar = {
	cellDatas: CellType,
	display: ToolbarDisplay,
	newColor: string | null,
	setNewColor: Dispatch<SetStateAction<string | null>>,
	setCellFocused: Dispatch<SetStateAction<null>>
}
function Toolbar({ cellDatas, display, newColor, setNewColor, setCellFocused }: PropsToolbar) {

	const { userDatas } = useContext(AuthContext)
	const [toolSelected, setToolSelected] = useState<ToolsSet | null>(ToolsSet.Pen)

	return (
		<Style
			onClick={(event) => event.stopPropagation()}
			$top={display.top} $left={display.left}>
			<Interfaces>
				<Colors>
				{
					Object.entries(colors.palette).map((color, index) => 
						<ToolbarColor
							key={`toolbarcolor_${index}`}
							newColor={newColor}
							setNewColor={setNewColor}
							color={color[1]}
						/>)
				}
				</Colors>
				<Tools>
					<Tool tool={ToolsSet.Pen} setToolSelected={setToolSelected} icon={PenIcon} price={0}
						selected={toolSelected === ToolsSet.Pen} available={userDatas.wallet >= 0} />
					<Tool tool={ToolsSet.Bomb} setToolSelected={setToolSelected} icon={BombIcon} price={15}
						selected={toolSelected === ToolsSet.Bomb} available={userDatas.wallet >= 15} />
					<Tool tool={ToolsSet.Screen} setToolSelected={setToolSelected} icon={ScreenIcon} price={9999}
						selected={toolSelected === ToolsSet.Screen} available={userDatas.wallet >= 9999} />
				</Tools>
				<Wallet>
					<p>
						{userDatas.wallet}
					</p>
					<img src={CoinIcon} />
				</Wallet>
				{
					<DrawButton cellId={cellDatas.id} toolSelected={toolSelected}
						newColor={newColor} setCellFocused={setCellFocused} />
				}
			</Interfaces>
		</Style>
	)
}

export default Toolbar