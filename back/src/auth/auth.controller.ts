import { Body, Controller, Delete, Get, Post, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { Response } from 'express';
import { UserId } from '../app.decorator';
import { SignupDto } from './auth.dto';

@Controller('auth')
export class AuthController {
	constructor(private AuthService: AuthService) {}

	@Post('signup')
	async signup(@Body() { username, password }: SignupDto, @Res() response: Response) {
		await this.AuthService.signup(username, password, response)
	}

	@Post('signin')
	async signin(@Body() { username, password }, @Res() response: Response) {
		await this.AuthService.signin(username, password, response)
	}

	@Get()
	@UseGuards(AuthGuard)
	async verifyToken() {
	}

	@Delete('logout')
	@UseGuards(AuthGuard)
	async logout(@UserId() userId: number, @Res() response: Response) {
		await this.AuthService.logout(userId, response)
	}
}
