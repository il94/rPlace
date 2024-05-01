import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { AuthRepository } from './auth.repository';
import * as argon2 from 'argon2';

@Injectable()
export class AuthService {
	constructor(
		private jwt: JwtService,
		private repository: AuthRepository
	) {}

	async signup(username: string, password: string, response: Response) {
		const hash = await argon2.hash(password)

		const userId = await this.repository.createUser(username, hash)
		
		const token = this.signAccessToken(userId)
		const refreshToken = this.signRefreshToken(userId)
		
		await this.repository.setRefreshToken(userId, refreshToken)
		
		response.cookie("access_token", token, { httpOnly: true }).redirect(process.env.URL_FRONT)
	}

	async signin(username: string, password: string, response: Response) {

		const user = await this.repository.getUser(username)

		if (!(await argon2.verify(user.hash, password)))
			return false
		else
		{
			const token = this.signAccessToken(user.id)
			const refreshToken = this.signRefreshToken(user.id)

			await this.repository.setRefreshToken(user.id, refreshToken)
		
			response.cookie("access_token", token, { httpOnly: true }).redirect(process.env.URL_FRONT)
		}
	}

	async logout(userId: number, response: Response) {
		await this.repository.removeRefreshToken(userId)

		response.clearCookie("access_token").redirect(process.env.URL_FRONT)
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
