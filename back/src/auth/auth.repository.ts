import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthRepository {
	constructor(
		private prisma: PrismaService
	) {}

	async getRefreshToken(userId: number): Promise<string> {
		const refreshToken = await this.prisma.user.findUnique({
			where: {
				id: userId
			},
			select: {
				refreshToken: true
			}
		})

		return (refreshToken.refreshToken)
	}

	async createUser(username: string, hash: string): Promise<number> {
		const userCreated =  await this.prisma.user.create({
			data: {
				username: username,
				hash: hash,
				points: 0,
				refreshToken: ''
			}
		})

		return (userCreated.id)
	}

	async setRefreshToken(userId: number, refreshToken: string) {
		await this.prisma.user.update({
			where: {
				id: userId
			},
			data: {
				refreshToken: refreshToken,
			}
		})
	}
}
