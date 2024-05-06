import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { GridRepository } from './grid.repository';
import { CellService } from 'src/cell/cell.service';
import { Grid } from '@prisma/client';

@Injectable()
export class GridService implements OnApplicationBootstrap {
	constructor(
		private repository: GridRepository,
		private cellService: CellService
	) {}

	// Cree la grille
	async onApplicationBootstrap() {
		const gridExist = await this.gridExist()
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

	// Retourne la grille
	async getGrid(): Promise<Grid> {
		const emptyGrid = await this.repository.getGrid()
		const cellsGrid = await this.cellService.getAllCells(emptyGrid.id)

		const grid = {
			id: emptyGrid.id,
			cells: cellsGrid.map((cell: CellOnGrid) => {
				return {
					id: cell.id,
					color: cell.history[0].color
				}
			})
		}

		return (grid)
	}

	// Verifie si la grille existe
	async gridExist(): Promise<boolean> {
		return (!!await this.repository.getGrid())
	}
}
