import { Body, Controller, Delete, Post, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { Response } from 'express';
import { UserId } from '../app.decorator';

@Controller('auth')
export class AuthController {
	constructor(private AuthService: AuthService) {}

	@Post('signup')
	async signup(@Body() { username, password }, @Res() response: Response) {
		await this.AuthService.signup(username, password, response)
	}

	@Post('signin')
	async signin(@Body() { username, password }, @Res() response: Response) {
		await this.AuthService.signin(username, password, response)
	}

	@Delete('logout')
	@UseGuards(AuthGuard)
	async logout(@UserId() userId: number, @Res() response: Response) {
		await this.AuthService.logout(userId, response)
	}
}
