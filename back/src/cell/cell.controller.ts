import { Body, Controller, Get, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { CellService } from './cell.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { UserId } from 'src/app.decorator';

@Controller('cell')
@UseGuards(AuthGuard)
export class CellController {
	constructor(private CellService: CellService) {}

	// Change la couleur de tout les pixels
	@Post('all')
	async setNewColorAll(@UserId() userId: number,
	@Body('newColor') newColor: string) {
		await this.CellService.setNewColorAll(userId, newColor)
	}

	// Change la couleur d'un pixel
	@Post(':id')
	async setNewColor(@UserId() userId: number,
	@Param('id', ParseIntPipe) cellId: number,
	@Body('newColor') newColor: string) {
		await this.CellService.setNewColor(userId, cellId, newColor)
	}

	// Change la couleur des pixels en zone
	@Post(':id/zone')
	async setNewColorZone(@UserId() userId: number,
	@Param('id', ParseIntPipe) cellId: number,
	@Body('newColor') newColor: string) {
		await this.CellService.setNewColorZone(userId, cellId, newColor)
	}

	// Retourne l'historique d'une cellule
	@Get(':id/history')
	async getHistory(@Param('id', ParseIntPipe) cellId: number) {
		return await this.CellService.getHistory(cellId)
	}

}
