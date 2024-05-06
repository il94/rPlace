import { ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { History, Prisma, Role, User } from '@prisma/client';
import * as argon2 from 'argon2';

@Injectable()
export class UserService {
	constructor(private repository: UserRepository) {}

	// Cree un user
	async createUser(username: string, hash: string): Promise<Partial<User>> {
		try {
			const partialUser = await this.repository.createUser(username, hash)

			return (partialUser)
		}
		catch (error) {
			if (error instanceof Prisma.PrismaClientKnownRequestError)
				throw new ConflictException("Username already taken")
			
			console.error(error)
			throw error
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

	// Retourne un user
	async getUser(userId: number) {
		try {
			const partialUser = await this.repository.getUserById(userId)
			if (!partialUser)
				throw new NotFoundException("User not found")

			return (partialUser)
		}
		catch (error) {
			if (!(error instanceof NotFoundException))
				console.error(error)
			throw error
		}
	}

	// Retourne un user
	async getUserByUsername(username: string): Promise<Partial<User>> {
		try {
			const partialUser = await this.repository.getUserByUsername(username)
			if (!partialUser)
				throw new NotFoundException("User not found")
	
			return (partialUser)
		}
		catch (error) {
			if (!(error instanceof NotFoundException))
				console.error(error)
			throw error
		}
	}

	// Retourne le username du user
	async getUsername(userId: number) {
		try {
			const username = await this.repository.getUsername(userId)
			if (!username)
				throw new NotFoundException("User not found")
			return (username)
		}
		catch (error) {
			if (!(error instanceof NotFoundException))
				console.error(error)
			throw error
		}
	}

	// Retourne le role du user
	async getRole(userId: number) {
		try {
			const role = await this.repository.getRole(userId)
			if (!role)
				throw new NotFoundException("User not found")
			return (role)
		}
		catch (error) {
			if (!(error instanceof NotFoundException))
				console.error(error)
			throw error
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

	// Retourne les dernieres entrees du user
	async getLastEntries(username: string, count: number): Promise<History[] | null> {
		try {
			const lastEntries = await this.repository.getLastEntries(username, count)
		
			if (lastEntries.length !== count)
				return (null)
			return (lastEntries)
		}
		catch (error) {
			console.error(error)
			throw error
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

	// Verifie si le user est admin
	async isAdmin(userId: number) {
		try {
			const role = await this.repository.getRole(userId)

			return (role === Role.ADMIN)
		}
		catch (error) {
			console.error(error)
			throw error
		}
	}

	// Change le role d'un user
	async setRole(authId: number, targetId: number, newRole: Role) {
		try {
			const authIsAdmin = await this.isAdmin(authId)
			if (!authIsAdmin)
				throw new ForbiddenException("You doesn't have permission for this action")

			await this.repository.setRole(targetId, newRole)
		}
		catch (error) {
			if (!(error instanceof ForbiddenException))
				console.error(error)
			throw error
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