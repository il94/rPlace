import { Injectable } from '@nestjs/common';
import { GridGateway } from 'src/grid/grid.gateway';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CellService {
	constructor(
		private prisma: PrismaService,
		private GridGateway: GridGateway
	) {}

	async setNewColorAll(newColor: string) {
		await this.prisma.cell.updateMany({
			data: {
				color: newColor
			}
		})

		this.GridGateway.server.emit("screenUsed", newColor)
	}

	async setNewColor(cellId: number, newColor: string) {
		await this.prisma.cell.update({
			where: {
				id: cellId
			},
			data: {
				color: newColor
			}
		})

		this.GridGateway.server.emit("pixelDrawed", cellId, newColor)
	}

	async setNewColorZone(cellId: number, newColor: string) {

		const results: number[] = await this.drawCircle(cellId, 11)

		await this.prisma.cell.updateMany({
			where: {
				id: {
					in: results
				}
			},
			data: {
				color: newColor
			}
		})

		this.GridGateway.server.emit("bombUsed", cellId, newColor)
	}

	async drawCircle(start: number, size: number): Promise<number[]> {
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
