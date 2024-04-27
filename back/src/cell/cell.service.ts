import { Injectable } from '@nestjs/common';
import { GridGateway } from 'src/grid/grid.gateway';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CellService {
	constructor(
		private prisma: PrismaService,
		private GridGateway: GridGateway
	) {}

	async setNewColor(cellId: number, newColor: string) {
		await this.prisma.cell.update({
			where: {
				id: cellId
			},
			data: {
				color: newColor
			}
		})

		this.GridGateway.server.emit("newColor", cellId, newColor)

	}
}
