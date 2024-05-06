import { Injectable, NotFoundException } from '@nestjs/common';
import { History, Role, User } from '@prisma/client';
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

		console.log(`User created | createUser() :`)
		console.table(userCreated)
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

		console.log(`User created | createRoot() :`)
		console.table(rootCreated)
		return (rootCreated)
	}

	async getUserById(userId: number): Promise<Partial<User> | null> {
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

		console.log(`User ${userId} | getUserById() :`)
		console.table(partialUser)
		return (partialUser)
	}

	async getUserByUsername(username: string): Promise<Partial<User> | null> {
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
		
		console.log(`User ${username} | getUserByUsername() :`)
		console.table(partialUser)
		return (partialUser)
	}

	async getUsername(userId: number): Promise<string | null> {
		const username = await this.prisma.user.findUnique({
			where: {
				id: userId
			},
			select: {
				username: true
			}
		})

		console.log(`User ${userId} | getUsername() :`)
		console.table(username)
		return (username.username)
	}

	async getRole(userId: number): Promise<Role | null> {
		const role = await this.prisma.user.findUnique({
			where: {
				id: userId
			},
			select: {
				role: true
			}
		})

		console.log(`User ${userId} | getRole() :`)
		console.table(role.role)
		return (role.role)
	}

	async getLastEntries(username: string, count: number): Promise<History[] | null> {
		const lastEntries = await this.prisma.history.findMany({
			where: {
				username: username
			},
			orderBy: {
				id: 'desc'
			},
			take: count
		})

		console.log(`User ${username} | getLastEntries() :`)
		console.table(lastEntries)
		return (lastEntries)
	}

	async addPoint(userId: number, value: number) {
		const log = await this.prisma.user.update({
			where: {
				id: userId
			},
			data: {
				wallet: {
					increment: value
				}
			}
		})

		console.log(`User ${userId} | addPoint() :`)
		console.table(log)
	}

	async removePoints(userId: number, value: number) {
		const log = await this.prisma.user.update({
			where: {
				id: userId
			},
			data: {
				wallet: {
					decrement: value
				}
			}
		})

		console.log(`User ${userId} | removePoints() :`)
		console.table(log)
	}

	async setRole(userId: number, newRole: Role) {
		const log = await this.prisma.user.update({
			where: {
				id: userId
			},
			data: {
				role: newRole
			}
		})

		console.log(`User ${userId} | setRole() :`)
		console.table(log)
	}

	async setLastInputDate(userId: number, newDate: Date) {
		const log = await this.prisma.user.update({
			where: {
				id: userId
			},
			data: {
				lastPut: newDate
			}
		})

		console.log(`User ${userId} | setLastInputDate() :`)
		console.table(log)
	}
}