import { CellType, GridType } from "../../utils/types"
import Cell from "../Cell"
import { Style } from "./style"

type PropsGrid = {
	grid: GridType | undefined
}
function Grid({ grid }: PropsGrid) {

	return (
		<Style>
			{
				grid && grid.cells.map((cell: CellType, index: number) => 
					<Cell cell={cell} key={`cell_${index}`} />
				)
			}
		</Style>
	)
}

export default Grid