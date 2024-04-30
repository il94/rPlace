import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthRepository } from './auth.repository';

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(
		private jwt: JwtService,
		private AuthService: AuthService,
		private AuthRepository: AuthRepository,
	) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const access_token = context.switchToHttp().getRequest().cookies.access_token
		if (!access_token)
			return false
		else
		{
			const payload = this.jwt.decode(access_token)

			if (this.AuthService.isNotExpired(payload.exp))
				return true
			else {
				const refreshToken = await this.AuthRepository.getRefreshToken(payload.userId)
				const refreshPayload = this.jwt.decode(refreshToken)

				if (this.AuthService.isNotExpired(refreshPayload.exp))
				{
					const response = context.switchToHttp().getResponse();
					response.cookie("access_token", this.AuthService.signAccessToken(payload.userId), { httpOnly: true })

					return true
				}
				return false
			}
		}
	}
}