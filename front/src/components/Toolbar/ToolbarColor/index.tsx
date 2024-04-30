import { Dispatch, SetStateAction } from "react";
import { Style } from "./style";

type PropsToolbarColor = {
	color: string,
	setPreviousColor: Dispatch<SetStateAction<string | null>>
}
function ToolbarColor({ color, setPreviousColor }: PropsToolbarColor) {
	return (
		color === "none" ?
		<Style onClick={() => setPreviousColor(null)} $backgroundColor={color}></Style>
		:
		<Style onClick={() => setPreviousColor(color)} $backgroundColor={color} />
	)
}

export default ToolbarColor