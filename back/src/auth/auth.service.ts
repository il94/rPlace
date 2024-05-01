import { BadRequestException, ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { AuthRepository } from './auth.repository';
import * as argon2 from 'argon2';
import { Prisma } from '@prisma/client';
import { NotFoundError } from 'rxjs';

@Injectable()
export class AuthService {
	constructor(
		private jwt: JwtService,
		private repository: AuthRepository
	) {}

	async signup(username: string, password: string, response: Response) {
		try {
			const hash = await argon2.hash(password)

			const userId = await this.repository.createUser(username, hash)
			
			const token = this.signAccessToken(userId)
			const refreshToken = this.signRefreshToken(userId)
			
			await this.repository.setRefreshToken(userId, refreshToken)
			
			response.cookie("access_token", token, { httpOnly: true }).send({ status: 'ok' })
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

	async signin(username: string, password: string, response: Response) {
		try {
			const user = await this.repository.getUser(username)

			if (!(await argon2.verify(user.hash, password)))
				throw new NotFoundException("User not found")
			else
			{
				const token = this.signAccessToken(user.id)
				const refreshToken = this.signRefreshToken(user.id)
	
				await this.repository.setRefreshToken(user.id, refreshToken)
			
				response.cookie("access_token", token, { httpOnly: true }).send({ status: 'ok' })
			}	
		}
		catch (error) {
			if (error instanceof Prisma.PrismaClientKnownRequestError)
				throw new ForbiddenException("The provided credentials are not allowed")
			else
				throw error
		}
	}

	async logout(userId: number, response: Response) {
		try {
			await this.repository.removeRefreshToken(userId)
			
			response.clearCookie("access_token").redirect(process.env.URL_FRONT)
		}
		catch (error) {
			console.log(error)
		}
	}

	/* ==================== UTILS ================== */

	isNotExpired(expirationTimestamp: number): boolean {
		const currentTimestamp = Math.floor(Date.now() / 1000);
		return currentTimestamp < expirationTimestamp;
	}

	signAccessToken(userId: number) {
		const token = this.jwt.sign({ userId: userId }, { secret: process.env.JWT_SECRET, expiresIn: "5m" })
		return (token)
	}

	signRefreshToken(userId: number) {
		const refreshToken = this.jwt.sign({ userId: userId }, { secret: process.env.JWT_SECRET, expiresIn: "14d" })
		return (refreshToken)
	}

}
