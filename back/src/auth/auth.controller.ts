import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { UserId } from '../app.decorator';
import { SigninDto, SignupDto } from './auth.dto';
import { UserService } from 'src/user/user.service';

@Controller('auth')
export class AuthController {
	constructor(
		private service: AuthService,
		private userService: UserService
	) {}

	// Cree un compte et renvoie un token d'authentification
	@Post('signup')
	async signup(@Body() { username, password }: SignupDto): Promise<AuthType> {
		return await this.service.signup(username, password)
	}

	// Renvoie un token d'authentification
	@Post('signin')
	async signin(@Body() { username, password }: SigninDto): Promise<AuthType> {
		return await this.service.signin(username, password)
	}

	// Verifie le token fourni
	@Get()
	@UseGuards(AuthGuard)
	async verifyToken(@UserId() userId: number) {
		return (await this.userService.getUser(userId))
	}

	// @Delete('logout')
	// @UseGuards(AuthGuard)
	// async logout(@UserId() userId: number) {
	// 	await this.service.logout(userId)
	// }
}
