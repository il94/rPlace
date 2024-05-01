import { Dispatch, SetStateAction } from "react"
import { ToolsSet } from "../../../utils/enums"
import { Button, Price, Style } from "./style"

type PropsTool = {
	tool: ToolsSet,
	setToolSelected: Dispatch<SetStateAction<ToolsSet | null>>,
	icon: string,
	price: number,
	available: boolean,
	selected: boolean
}

function Tool({ tool, setToolSelected, icon, price, available, selected }: PropsTool) {
	return (
		<Style>
			<Button onClick={() => available && setToolSelected(tool)}
				$available={available} $selected={selected}>
				<img src={icon} />
			</Button>
			<Price>
				{price}
			</Price>
		</Style>
	)
}

export default Tool