import { Controller, Get } from '@nestjs/common';
import { GridService } from './grid.service';
import { Grid } from '@prisma/client';

@Controller('grid')
export class GridController {
	constructor(private service: GridService) {}

	// Retourne la grille
	@Get()
	async getGrid(): Promise<Grid> {
		return await this.service.getGrid()
	}
}
