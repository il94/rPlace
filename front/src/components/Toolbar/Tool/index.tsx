import { Dispatch, SetStateAction } from "react"
import { ToolsSet } from "../../../utils/enums"
import { Button, Price, Style } from "./style"

type PropsTool = {
	tool: ToolsSet,
	icon: string,
	price: number,
	toolSelected: ToolsSet | null,
	setToolSelected: Dispatch<SetStateAction<ToolsSet | null>>
}

function Tool({ tool, icon, price, toolSelected, setToolSelected }: PropsTool) {
	return (
		<Style>
			<Button onClick={() => setToolSelected(tool)} $selected={toolSelected === tool}>
				<img src={icon} />
			</Button>
			<Price>
				{price}
			</Price>
		</Style>
	)
}

export default Tool