import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { UserService } from 'src/user/user.service';
import { config } from 'src/config/config';

@Injectable()
export class AuthService {
	constructor(
		private jwt: JwtService,
		private userService: UserService
	) {}

	// Cree un compte et renvoie un token d'authentification
	async signup(username: string, password: string): Promise<AuthType> {
		try {
			const hash = await argon2.hash(password)

			const user = await this.userService.createUser(username, hash)
			
			const token = this.signAccessToken(user.id)
			// const refreshToken = this.signRefreshToken(user.id)
			
			// await this.repository.setRefreshToken(user.id, refreshToken)
			
			// delete user.refreshToken

			return ({ user, token })

		}
		catch (error) {
			throw error
		}
	}

	// Renvoie un token d'authentification
	async signin(username: string, password: string): Promise<AuthType> {
		try {
			const user = await this.userService.getUserByUsername(username)
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

	// Cree un token
	signAccessToken(userId: number) {
		const token = this.jwt.sign({ userId: userId }, { secret: process.env.JWT_SECRET, expiresIn: config.expiresTokenDuration })
		return (token)
	}

	signRefreshToken(userId: number) {
		const refreshToken = this.jwt.sign({ userId: userId }, { secret: process.env.JWT_SECRET, expiresIn: config.expiresRefreshDuration })
		return (refreshToken)
	}

}
