import { Controller, Get } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { GridService } from './grid.service';

@Controller('grid')
export class GridController {
	constructor(private GridService: GridService) {}

	@Get()
	async getGrid() {
		return await this.GridService.getGrid()
	}
}
