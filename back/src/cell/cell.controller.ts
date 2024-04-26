import { Body, Controller, Param, ParseIntPipe, Post } from '@nestjs/common';
import { CellService } from './cell.service';

@Controller('cell')
export class CellController {
	constructor(private CellService: CellService) {}

	@Post(':id/color')
	async setNewColor(@Param('id', ParseIntPipe) cellId: number,
	@Body('newColor') newColor: string) {
		await this.CellService.setNewColor(cellId, newColor)
	}
}
