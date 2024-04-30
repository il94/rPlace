import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthRepository } from './auth.repository';
import * as argon2 from 'argon2';

@Injectable()
export class AuthService {
	constructor(
		private prisma: PrismaService,
		private jwt: JwtService,
		private AuthRepository: AuthRepository,
	) {}

	async signup(username: string, password: string, response: Response) {
		const hash = await argon2.hash(password)

		const userId =  await this.AuthRepository.createUser(username, hash)
		
		const token = this.signAccessToken(userId)
		const refreshToken = this.signRefreshToken(userId)
		
		await this.AuthRepository.setRefreshToken(userId, refreshToken)
		
		response.cookie("access_token", token, { httpOnly: true }).redirect("http://localhost:5173")
	}

	async signin(username: string, password: string) {
		await this.prisma.user.findFirst({
			where: {
				username: username,
				hash: password
			}
		})
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
