import { Body, Controller, Param, ParseIntPipe, Post } from '@nestjs/common';
import { CellService } from './cell.service';

@Controller('cell')
export class CellController {
	constructor(private CellService: CellService) {}

	@Post('all')
	async setNewColorAll(@Body('newColor') newColor: string) {
		await this.CellService.setNewColorAll(newColor)
	}

	@Post(':id')
	async setNewColor(@Param('id', ParseIntPipe) cellId: number,
	@Body('newColor') newColor: string) {
		await this.CellService.setNewColor(cellId, newColor)
	}

	@Post(':id/zone')
	async setNewColorZone(@Param('id', ParseIntPipe) cellId: number,
	@Body('newColor') newColor: string) {
		await this.CellService.setNewColorZone(cellId, newColor)
	}
}
