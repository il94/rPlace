import { ForbiddenException, Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserService {
	constructor(private repository: UserRepository) {}

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
}