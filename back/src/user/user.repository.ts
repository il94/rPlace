import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserRepository {
	constructor(
		private prisma: PrismaService
	) {}

	async getUsername(userId: number): Promise<string> {
		const username = await this.prisma.user.findUnique({
			where: {
				id: userId
			},
			select: {
				username: true
			}
		})

		return (username.username)
	}

	async addPoint(userId: number) {
		await this.prisma.user.update({
			where: {
				id: userId
			},
			data: {
				points: {
					increment: 1
				}
			}
		})
	}

	async removePoints(userId: number, value: number) {
		await this.prisma.user.update({
			where: {
				id: userId
			},
			data: {
				points: {
					decrement: value
				}
			}
		})
	}

	async setLastInputDate(userId: number) {
		await this.prisma.user.update({
			where: {
				id: userId
			},
			data: {
				lastPut: new Date()
			}
		})
	}

	async getLastPutAndWallet(userId: number): Promise<Partial<User>> {
		const userDatas: Partial<User> = await this.prisma.user.findFirst({
			where: {
				id: userId
			},
			select: {
				points: true,
				lastPut: true
			}
		})

		return (userDatas)
	}
}