import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/config/prisma.service';

@Injectable()
export class GridRepository {
	constructor(private prisma: PrismaService) {}

	async createGrid() {
		const grid = await this.prisma.grid.create({})

		return (grid)
	}

	async getGrid() {
		const grid = await this.prisma.grid.findFirst({})

		return (grid)
	}

	async findGrid() {
		const gridFounded = !!await this.prisma.grid.findFirst({})

		return (gridFounded)
	}

}