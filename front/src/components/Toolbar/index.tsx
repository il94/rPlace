import { ToolbarType } from "../../utils/types";
import { Style } from "./style";

type PropsToolbar = {
	toolbar: ToolbarType
}
function Toolbar({ toolbar }: PropsToolbar) {
	return (
		<Style $top={toolbar.top} $left={toolbar.left} />
	)
}

export default Toolbar