import { Body, Controller, Get, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { CellService } from './cell.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { UserId } from 'src/app.decorator';

@Controller('cell')
@UseGuards(AuthGuard)
export class CellController {
	constructor(private CellService: CellService) {}

	@Post('all')
	async setNewColorAll(@UserId() userId: number,
	@Body('newColor') newColor: string) {
		await this.CellService.setNewColorAll(userId, newColor)
	}

	@Post(':id')
	async setNewColor(@UserId() userId: number,
	@Param('id', ParseIntPipe) cellId: number,
	@Body('newColor') newColor: string) {
		await this.CellService.setNewColor(userId, cellId, newColor)
	}

	@Post(':id/zone')
	async setNewColorZone(@UserId() userId: number,
	@Param('id', ParseIntPipe) cellId: number,
	@Body('newColor') newColor: string) {
		await this.CellService.setNewColorZone(userId, cellId, newColor)
	}

	@Get(':id/history')
	async getHistory(@Param('id', ParseIntPipe) cellId: number) {
		return await this.CellService.getHistory(cellId)
	}

}
