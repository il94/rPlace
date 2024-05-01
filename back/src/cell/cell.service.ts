import { Injectable } from '@nestjs/common';
import { GridGateway } from 'src/grid/grid.gateway';
import { CellRepository } from './cell.repository';
import { UserRepository } from 'src/user/user.repository';

@Injectable()
export class CellService {
	constructor(
		private gateway: GridGateway,
		private repository: CellRepository,
		private userRepository: UserRepository
	) {}

	async setNewColorAll(userId: number, newColor: string) {
		for (let i = 1; i <= 1600; i++) {
			await this.drawPixel(userId, i, newColor)
		}

		this.gateway.server.emit("screenUsed", newColor)
	}

	async setNewColor(userId: number, cellId: number, newColor: string) {
		await this.drawPixel(userId, cellId, newColor)

		this.gateway.server.emit("pixelDrawed", cellId, newColor)
	}

	async setNewColorZone(userId: number, cellId: number, newColor: string) {
		const results: number[] = await this.determineCircle(cellId, 11)

		for (const id of results) {
			await this.drawPixel(userId, id, newColor)
		}

		this.gateway.server.emit("bombUsed", cellId, newColor)
	}
	
	async getHistory(cellId: number) {
		const history = await this.repository.getCellHistory(cellId)

		history.reverse()
		return (history)
	}

	/* ==================== UTILS ================== */

	async drawPixel(userId: number, cellId: number, newColor: string) {
		const username = await this.userRepository.getUsername(userId)
	
		await this.repository.createCellHistoryEntry(username, cellId, newColor)
		const count = await this.repository.getCellHistoryCount(cellId)
		if (count > 5)
			await this.repository.deleteCellHistoryLatestEntry(cellId)
	}

	async determineCircle(start: number, size: number): Promise<number[]> {
		function getIndexLine(position: number) {
			return (Math.floor(position / 40))
		}
		function getIndexColumn(position: number) {
			if (position % 40 === 0)
				return 40
			return (Math.floor(position % 40))
		}

		function distance(x1: number, y1: number, x2: number, y2: number) {
			return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))
		}

		const centerX = getIndexColumn(start)
		const centerY = getIndexLine(start)

		const results = []

		for (let i = 0; i < size; i++) {
			for (let j = 0; j < size; j++) {
				const y = centerY - Math.floor(size / 2) + i
				const x = centerX - Math.floor(size / 2) + j
				if ((y <= 40 && y >= 0) && (x <= 40 && x >= 1) &&
					(distance(centerX, centerY, x, y) <= size / 2))
				{
					const result = y * 40 + x
					results.push(result)
				}
			}
		}

		return (results)
	}
}
