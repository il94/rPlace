import { ForbiddenException, Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { Prisma, Role } from '@prisma/client';
import * as argon2 from 'argon2';

@Injectable()
export class UserService {
	constructor(private repository: UserRepository) {}

	async setRole(authId: number, targetId: number, newRole: Role) {
		try {
			const authIsAdmin = await this.isAdmin(authId)
			if (!authIsAdmin)
				throw new ForbiddenException("You doesn't have permission for this action")

			await this.repository.setRole(targetId, newRole)
		}
		catch (error) {
			console.error(error)
		}
	}

	async createUser(username: string, password: string) {
		try {
			const hash = await argon2.hash(password)
			const partialUser = await this.repository.createUser(username, hash)

			return (partialUser)
		}
		catch (error) {
			console.error(error)
		}
	}

	async createRoot() {
		try {
			const username = process.env.ROOT_USERNAME
			const hash = await argon2.hash(process.env.ROOT_PASSWORD)
			await this.repository.createRoot(username, hash)
		}
		catch (error) {
			console.error(error)
		}
	}

	async getUser(userId: number) {
		try {
			const partialUser = await this.repository.getUserById(userId)
			return (partialUser)
		}
		catch (error) {
			if (error instanceof Prisma.PrismaClientKnownRequestError)
				throw new ForbiddenException("The provided credentials are not allowed")
			else
				throw error
		}
	}

	async getUserByUsername(username: string) {
		try {
			const partialUser = await this.repository.getUserByUsername(username)
			return (partialUser)
		}
		catch (error) {
			if (error instanceof Prisma.PrismaClientKnownRequestError)
				throw new ForbiddenException("The provided credentials are not allowed")
			else
				throw error
		}
	}

	async getUsername(userId: number) {
		try {
			const username = await this.repository.getUsername(userId)
			return (username)
		}
		catch (error) {
			console.error(error)
		}
	}

	async getRole(userId: number) {
		try {
			const role = await this.repository.getRole(userId)
			return (role)
		}
		catch (error) {
			console.error(error)
		}
	}
	
	async getLastPutAndWallet(userId: number) {
		try {
			const userDatas = await this.repository.getLastPutAndWallet(userId)
			return (userDatas)
		}
		catch (error) {
			console.error(error)
		}
	}

	async findRoot() {
		try {
			const username = process.env.ROOT_USERNAME
			const rootFounded = await this.repository.findRoot(username)

			return (rootFounded)
		}
		catch (error) {
			console.error(error)
		}
	}

	async isAdmin(userId: number) {
		try {
			const role = await this.repository.getRole(userId)

			return (role === Role.ADMIN)
		}
		catch (error) {
			console.error(error)
		}
	}
	
	async addPoints(userId: number, value: number) {
		try {
			await this.repository.addPoint(userId, value)
		}
		catch (error) {
			console.error(error)
		}
	}

	async removePoints(userId: number, value: number) {
		try {
			await this.repository.removePoints(userId, value)
		}
		catch (error) {
			console.error(error)
		}
	}

	async setLastInputDate(userId: number) {
		try {
			const currentDate = new Date()
			await this.repository.setLastInputDate(userId, currentDate)
		}
		catch (error) {
			console.error(error)
		}
	}

}