import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CellService {
	constructor(private prisma: PrismaService) {}

	async setNewColor(cellId: number, newColor: string) {
		await this.prisma.cell.update({
			where: {
				id: cellId
			},
			data: {
				color: newColor
			}
		})
	}
}
