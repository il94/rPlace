import { Injectable } from '@nestjs/common';
import { History, Role } from '@prisma/client';
import { PrismaService } from 'src/config/prisma.service';

@Injectable()
export class CellRepository {
	constructor(
		private prisma: PrismaService
	) {}

	async createCell(gridId: number) {
		const log = await this.prisma.cell.create({
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

		console.log(`Grid ${gridId} | createCell() :\n`)
		console.table(log)
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

		console.log(`Grid ${gridId} | getAllCells() :`)
		console.table(cells)
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

		console.table(`Cell ${cellId} | getCellHistory() :`)
		console.table(history)
		return (history)
	}

	async getCellHistoryCount(cellId: number): Promise<number> {
		const count = await this.prisma.history.count({
			where: {
				cellId: cellId
			}
		})

		console.log(`Cell ${cellId} | getCellHistoryCount() :`)
		console.table(count)
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
		const log = await this.prisma.history.delete({
			where: {
				id: latest.id
			}
		})

		console.log(`Cell ${cellId} | deleteCellHistoryLatestEntry() :`)
		console.table(log)
	}

	async createCellHistoryEntry(username: string, cellId: number, newColor: string, role: Role) {
		const log = await this.prisma.history.create({
			data: {
				cellId: cellId,
				color: newColor,
				username: username,
				role: role
			}
		})

		console.log(`Cell ${cellId} | createCellHistoryEntry() :`)
		console.table(log)
	}
}
