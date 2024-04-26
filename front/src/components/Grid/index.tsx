import Cell from "../Cell"
import { Style } from "./style"

function Grid() {

	const cells = []
	for (let i = 0; i < 1600; i++) {
		cells.push(<Cell key={`cell_${i}`} />)
	}

	return (
		<Style>
			{cells}
		</Style>
	)
}

export default Grid