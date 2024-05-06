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
			
			throw error
		}
	}

	// Cree le user root
	async createRoot() {
		const username = process.env.ROOT_USERNAME
		const hash = await argon2.hash(process.env.ROOT_PASSWORD)
		await this.repository.createRoot(username, hash)
	}

	// Retourne un user
	async getUser(userId: number) {
		const partialUser = await this.repository.getUserById(userId)
		if (!partialUser)
			throw new NotFoundException("User not found")

		return (partialUser)
	}

	// Retourne un user
	async getUserByUsername(username: string): Promise<Partial<User>> {
		const partialUser = await this.repository.getUserByUsername(username)
		if (!partialUser)
			throw new NotFoundException("User not found")

		return (partialUser)
	}

	// Retourne le username du user
	async getUsername(userId: number) {
		const username = await this.repository.getUsername(userId)
		if (!username)
			throw new NotFoundException("User not found")
		return (username)
	}

	// Retourne le role du user
	async getRole(userId: number) {
		const role = await this.repository.getRole(userId)
		if (!role)
			throw new NotFoundException("User not found")
		return (role)
	}

	// Retourne les dernieres entrees du user
	async getLastEntries(username: string, count: number): Promise<History[] | null> {
		const lastEntries = await this.repository.getLastEntries(username, count)
	
		if (lastEntries.length !== count)
			return (null)
		return (lastEntries)
	}

	// Verifie si le root existe
	async rootExist(): Promise<boolean> {
		const username = process.env.ROOT_USERNAME
		const rootFounded = !!await this.repository.getUserByUsername(username)

		return (rootFounded)
	}

	// Verifie si le user est admin
	async isAdmin(userId: number) {
		const role = await this.repository.getRole(userId)
		return (role === Role.ADMIN)
	}

	// Change le role d'un user
	async setRole(authId: number, targetId: number, newRole: Role) {
		const authIsAdmin = await this.isAdmin(authId)
		if (!authIsAdmin)
			throw new ForbiddenException("You doesn't have permission for this action")

		await this.repository.setRole(targetId, newRole)
	}

	// Ajoute des points au user
	async addPoints(userId: number, value: number) {
		await this.repository.addPoint(userId, value)
	}

	// Retire des points au user
	async removePoints(userId: number, value: number) {
		await this.repository.removePoints(userId, value)
	}

	// Set la date de la derniere entree du user
	async setLastInputDate(userId: number) {
		const currentDate = new Date()
		await this.repository.setLastInputDate(userId, currentDate)
	}

}