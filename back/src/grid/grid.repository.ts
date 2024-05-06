import { Injectable } from '@nestjs/common';
import { Grid } from '@prisma/client';
import { PrismaService } from 'src/config/prisma.service';

@Injectable()
export class GridRepository {
	constructor(private prisma: PrismaService) {}

	async createGrid(): Promise<Grid> {
		const grid = await this.prisma.grid.create({})

		console.log(`Grid created | createGrid() :`)
		console.table(grid)
		return (grid)
	}

	async getGrid(): Promise<Grid | null> {
		const grid = await this.prisma.grid.findFirst({})

		console.log(`Grid | getGrid() :`)
		console.table(grid)
		return (grid)
	}
}