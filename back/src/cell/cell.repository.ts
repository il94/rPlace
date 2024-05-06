import { Injectable } from '@nestjs/common';
import { History, Role } from '@prisma/client';
import { PrismaService } from 'src/config/prisma.service';

@Injectable()
export class CellRepository {
	constructor(
		private prisma: PrismaService
	) {}

	async createCell(gridId: number) {
		await this.prisma.cell.create({
			data: {
				gridId: gridId,
				history: {
					create: [{
						color: "#ffffff",
						username: "r/Place",
						role: Role.ADMIN
					}]
				}
			}
		})
	}

	async getAllCells(gridId: number): Promise<CellOnGrid[]> {
		const cells = await this.prisma.cell.findMany({
			where: {
				gridId: gridId
			},
			orderBy: {
				id: 'asc'
			},
			select: {
				id: true,
				history: {
					orderBy: {
						createdAt: 'desc'
					},
					take: 1
				}
			}
		})

		return (cells)
	}

	async getCellHistory(cellId: number): Promise<Partial<History>[]> {
		const history = await this.prisma.history.findMany({
			where: {
				cellId: cellId
			},
			select: {
				color: true,
				username: true,
				role: true
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

	async createCellHistoryEntry(username: string, cellId: number, newColor: string, role: Role) {
		await this.prisma.history.create({
			data: {
				cellId: cellId,
				color: newColor,
				username: username,
				role: role
			}
		})
	}
}
