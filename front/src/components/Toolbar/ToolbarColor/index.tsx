import { Dispatch, SetStateAction } from "react";
import { Style } from "./style";

type PropsToolbarColor = {
	color: string,
	newColor: string | null,
	setNewColor: Dispatch<SetStateAction<string | null>>
}
function ToolbarColor({ color, newColor, setNewColor }: PropsToolbarColor) {
	return (
		<Style onClick={() => setNewColor(color === "none" ? null : color)}
			$backgroundColor={color} $selected={color === newColor} />
	)
}

export default ToolbarColor