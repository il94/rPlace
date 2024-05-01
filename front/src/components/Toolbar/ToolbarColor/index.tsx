import { Dispatch, SetStateAction } from "react";
import { Style } from "./style";

type PropsToolbarColor = {
	color: string,
	previousColor: string | null,
	setPreviousColor: Dispatch<SetStateAction<string | null>>
}
function ToolbarColor({ color, previousColor, setPreviousColor }: PropsToolbarColor) {
	return (
		<Style onClick={() => setPreviousColor(color === "none" ? null : color)}
			$backgroundColor={color} $selected={color === previousColor} />
	)
}

export default ToolbarColor