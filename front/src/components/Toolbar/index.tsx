import { Role, ToolsSet } from "../../utils/enums";
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
import { CellType, ToolbarDisplay } from "../../utils/types";

type PropsToolbar = {
	cellDatas: CellType,
	display: ToolbarDisplay,
	newColor: string | null,
	setNewColor: Dispatch<SetStateAction<string | null>>,
	setCellFocused: Dispatch<SetStateAction<null>>
}
function Toolbar({ cellDatas, display, newColor, setNewColor, setCellFocused }: PropsToolbar) {

	const { userDatas } = useContext(AuthContext)
	const [toolSelected, setToolSelected] = useState<ToolsSet | null>(ToolsSet.PEN)

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
					<Tool tool={ToolsSet.PEN} setToolSelected={setToolSelected} icon={PenIcon} price={0}
						selected={toolSelected === ToolsSet.PEN} available={(userDatas.wallet >= 0 || userDatas.role === Role.ADMIN)} />
					<Tool tool={ToolsSet.BOMB} setToolSelected={setToolSelected} icon={BombIcon} price={15}
						selected={toolSelected === ToolsSet.BOMB} available={(userDatas.wallet >= 15 || userDatas.role === Role.ADMIN)} />
					<Tool tool={ToolsSet.SCREEN} setToolSelected={setToolSelected} icon={ScreenIcon} price={9999}
						selected={toolSelected === ToolsSet.SCREEN} available={(userDatas.wallet >= 9999 || userDatas.role === Role.ADMIN)} />
				</Tools>
				<Wallet>
					<p>
						{userDatas.role === Role.ADMIN ? "∞" : userDatas.wallet}
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