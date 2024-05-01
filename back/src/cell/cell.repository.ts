import { Injectable } from '@nestjs/common';
import { History } from '@prisma/client';
import { PrismaService } from 'src/config/prisma.service';

@Injectable()
export class CellRepository {
	constructor(
		private prisma: PrismaService
	) {}

	async getCellHistory(cellId: number): Promise<Partial<History>[]> {
		const history = await this.prisma.history.findMany({
			where: {
				cellId: cellId
			},
			select: {
				color: true,
				username: true
			},
			orderBy: {
				createdAt: 'desc'
			},
			take: 5
		})

		return (history)
	}

	async getCellHistoryCount(cellId: number): Promise<number> {
		const count = await this.prisma.history.count({
			where: {
				cellId: cellId
			}
		})

		return (count)
	}
	
	async deleteCellHistoryLatestEntry(cellId: number) {
		const latest = await this.prisma.history.findFirst({
			where: {
				cellId: cellId
			},
			orderBy: {
				createdAt: 'asc'
			}
		})
		await this.prisma.history.delete({
			where: {
				id: latest.id
			}
		})
	}

	async createCellHistoryEntry(username: string, cellId: number, newColor: string) {
		await this.prisma.history.create({
			data: {
				cellId: cellId,
				color: newColor,
				username: username
			}
		})
	}
}
