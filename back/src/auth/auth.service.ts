import { ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { AuthRepository } from './auth.repository';
import * as argon2 from 'argon2';
import { Prisma } from '@prisma/client';
import { UserService } from 'src/user/user.service';
import { UserRepository } from 'src/user/user.repository';

@Injectable()
export class AuthService {
	constructor(
		private jwt: JwtService,
		private repository: AuthRepository,
		private userRepository: UserRepository
	) {}

	async signup(username: string, password: string) {
		try {
			const hash = await argon2.hash(password)

			const user = await this.userRepository.createUser(username, hash)
			
			const token = this.signAccessToken(user.id)
			// const refreshToken = this.signRefreshToken(user.id)
			
			// await this.repository.setRefreshToken(user.id, refreshToken)
			
			delete user.hash
			// delete user.refreshToken

			return ({ user, token })

		}
		catch (error) {
			if (error.code === 'P2002') 
				throw new ConflictException("Username already taken")
			else if (error instanceof Prisma.PrismaClientKnownRequestError)
				throw new ForbiddenException("The provided credentials are not allowed")
			else
				throw error
		}
	}

	async signin(username: string, password: string) {
		try {
			const user = await this.userRepository.getUserByUsername(username)
			if (!(await argon2.verify(user.hash, password)))
				throw new NotFoundException("User not found")
			else
			{
				const token = this.signAccessToken(user.id)
				// const refreshToken = this.signRefreshToken(user.id)
	
				// await this.repository.setRefreshToken(user.id, refreshToken)
			
				delete user.hash
				// delete user.refreshToken

				return ({ user, token })
			}	
		}
		catch (error) {
			if (error instanceof Prisma.PrismaClientKnownRequestError)
				throw new ForbiddenException("The provided credentials are not allowed")
			else
				throw error
		}
	}

	// async logout(userId: number) {
	// 	try {
	// 		// await this.repository.removeRefreshToken(userId)
	// 	}
	// 	catch (error) {
	// 		console.error(error)
	// 	}
	// }

	/* ==================== UTILS ================== */

	isNotExpired(expirationTimestamp: number): boolean {
		const currentTimestamp = Math.floor(Date.now() / 1000);
		return currentTimestamp < expirationTimestamp;
	}

	signAccessToken(userId: number) {
		const token = this.jwt.sign({ userId: userId }, { secret: process.env.JWT_SECRET, expiresIn: "24h" })
		return (token)
	}

	signRefreshToken(userId: number) {
		const refreshToken = this.jwt.sign({ userId: userId }, { secret: process.env.JWT_SECRET, expiresIn: "14d" })
		return (refreshToken)
	}

}
