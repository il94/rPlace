import { StatePosition } from "../../utils/types";
import { Style } from "./style";

type PropsToolbar = {
	toolbar: StatePosition
}
function Toolbar({ toolbar }: PropsToolbar) {
	return (
		<Style $top={toolbar.top} $left={toolbar.left} $bottom={toolbar.bottom} $right={toolbar.right}/>
	)
}

export default Toolbar