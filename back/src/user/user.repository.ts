import { Injectable, NotFoundException } from '@nestjs/common';
import { Role, User } from '@prisma/client';
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
				lastPut: new Date(),
				role: Role.USER
			},
			select: {
				id: true,
				username: true,
				wallet: true,
				lastPut: true,
				role: true
			}
		})

		return (userCreated)
	}

	async createRoot(username: string, hash: string): Promise<Partial<User>> {
		const rootCreated =  await this.prisma.user.create({
			data: {
				username: username,
				hash: hash,
				wallet: 0,
				lastPut: new Date(),
				role: Role.ADMIN
			},
			select: {
				id: true,
				username: true,
				wallet: true,
				lastPut: true
			}
		})

		return (rootCreated)
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
			},
			select: {
				id: true,
				username: true,
				wallet: true,
				lastPut: true,
				role: true
			}
		})
		if (!partialUser)
			throw new NotFoundException("User not found")

		return (partialUser)
	}

	async getUserByUsername(username: string): Promise<Partial<User>> {
		const partialUser = await this.prisma.user.findUnique({
			where: {
				username: username
			},
			select: {
				id: true,
				username: true,
				wallet: true,
				lastPut: true,
				role: true,
				hash: true
			}
		})
		if (!partialUser)
			throw new NotFoundException("User not found")
		
		return (partialUser)
	}

	async getRole(userId: number) {
		const role = await this.prisma.user.findUnique({
			where: {
				id: userId
			},
			select: {
				role: true
			}
		})

		return (role.role)
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

	async getLastEntries(username: string, count: number) {
		const twoLastEntries = await this.prisma.history.findMany({
			where: {
				username: username
			},
			orderBy: {
				id: 'desc'
			},
			take: count
		})

		return (twoLastEntries)
	}

	async findRoot(username: string): Promise<Partial<boolean>> {
		const rootFounded = !!await this.prisma.user.findUnique({
			where: {
				username: username,
			}
		})

		return (rootFounded)
	}

	async addPoint(userId: number, value: number) {
		await this.prisma.user.update({
			where: {
				id: userId
			},
			data: {
				wallet: {
					increment: value
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

	async setRole(userId: number, newRole: Role) {
		await this.prisma.user.update({
			where: {
				id: userId
			},
			data: {
				role: newRole
			}
		})
	}

	async setLastInputDate(userId: number, newDate: Date) {
		await this.prisma.user.update({
			where: {
				id: userId
			},
			data: {
				lastPut: newDate
			}
		})
	}
}