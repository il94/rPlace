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

		return (refreshToken.refreshToken)
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

	async removeRefreshToken(userId: number) {
		await this.prisma.user.update({
			where: {
				id: userId
			},
			data: {
				refreshToken: null,
			}
		})
	}
}
