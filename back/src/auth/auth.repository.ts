import { User } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/config/prisma.service';

@Injectable()
export class AuthRepository {
	constructor(private prisma: PrismaService) {}

	async getRefreshToken(userId: number): Promise<string> {
		const refreshToken = await this.prisma.user.findUnique({
			where: {
				id: userId
			},
			select: {
				refreshToken: true
			}
		})

		console.log(`User ${userId} | getRefreshToken() :`)
		console.table(refreshToken.refreshToken)
		return (refreshToken.refreshToken)
	}

	async setRefreshToken(userId: number, refreshToken: string) {
		const log = await this.prisma.user.update({
			where: {
				id: userId
			},
			data: {
				refreshToken: refreshToken,
			}
		})

		console.log(`User ${userId} | setRefreshToken() :`)
		console.table(log)
	}

	async removeRefreshToken(userId: number) {
		const log = await this.prisma.user.update({
			where: {
				id: userId
			},
			data: {
				refreshToken: null,
			}
		})

		console.log(`User ${userId} | removeRefreshToken() :`)
		console.table(log)
	}
}
