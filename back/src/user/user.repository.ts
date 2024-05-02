import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/config/prisma.service';

@Injectable()
export class UserRepository {
	constructor(private prisma: PrismaService) {}

	async createUser(username: string, hash: string): Promise<Partial<User>> {
		
		const userCreated =  await this.prisma.user.create({
			data: {
				username: username,
				hash: hash,
				wallet: 0,
				lastPut: new Date()
			},
			select: {
				id: true,
				username: true,
				wallet: true,
				lastPut: true
			}
		})

		return (userCreated)
	}

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

	async getUserById(userId: number): Promise<Partial<User>> {
		const partialUser = await this.prisma.user.findUnique({
			where: {
				id: userId
			}
		})
		
		return (partialUser)
	}

	async getUserByUsername(username: string): Promise<Partial<User>> {
		const partialUser = await this.prisma.user.findUnique({
			where: {
				username: username
			}
		})
		if (!partialUser)
			throw new NotFoundException("User not found")
		
		return (partialUser)
	}

	async addPoint(userId: number) {
		await this.prisma.user.update({
			where: {
				id: userId
			},
			data: {
				wallet: {
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
				wallet: {
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
				wallet: true,
				lastPut: true
			}
		})

		return (userDatas)
	}
}