import { Dispatch, SetStateAction } from "react";
import { ColorsSet } from "../../../utils/enums";
import { Style } from "./style";

type PropsToolbarColor = {
	color: ColorsSet,
	setPreviousColor: Dispatch<SetStateAction<ColorsSet | null>>
}
function ToolbarColor({ color, setPreviousColor }: PropsToolbarColor) {
	return (
		color === ColorsSet.Transparent ?
		<Style onClick={() => setPreviousColor(null)} $backgroundColor={color}></Style>
		:
		<Style onClick={() => setPreviousColor(color)} $backgroundColor={color} />
	)
}

export default ToolbarColor