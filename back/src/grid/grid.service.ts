import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { GridRepository } from './grid.repository';
import { CellService } from 'src/cell/cell.service';

@Injectable()
export class GridService implements OnApplicationBootstrap {
	constructor(
		private repository: GridRepository,
		private cellService: CellService
	) {}

	async onApplicationBootstrap() {

		const gridExist = await this.repository.findGrid()
		if (!gridExist)
		{
			try {
				const grid = await this.repository.createGrid()
				for (let i = 0; i < 1600; i++) {
					await this.cellService.createCell(grid.id)
				}
			}
			catch (error) {
				console.error(error)
			}
		}
	}

	async getGrid() {
		try {
			const emptyGrid = await this.repository.getGrid()
			const cellsGrid = await this.cellService.getAllCells(emptyGrid.id)

			const grid = {
				id: emptyGrid.id,
				cells: cellsGrid.map((cell) => {
					return {
						id: cell.id,
						color: cell.history[0].color
					}
				})
			}

			return (grid)
		}
		catch (error) {
			throw error
		}
	}
}
