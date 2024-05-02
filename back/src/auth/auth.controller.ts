import { Body, Controller, Delete, Get, Post, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { Response } from 'express';
import { UserId } from '../app.decorator';
import { SigninDto, SignupDto } from './auth.dto';
import { UserService } from 'src/user/user.service';

@Controller('auth')
export class AuthController {
	constructor(
		private service: AuthService,
		private userService: UserService
	) {}

	@Post('signup')
	async signup(@Body() { username, password }: SignupDto) {
		return await this.service.signup(username, password)
	}

	@Post('signin')
	async signin(@Body() { username, password }: SigninDto) {
		return await this.service.signin(username, password)
	}

	@Get()
	@UseGuards(AuthGuard)
	async verifyToken(@UserId() userId: number) {
		return (await this.userService.getUser(userId))
	}

	@Delete('logout')
	@UseGuards(AuthGuard)
	async logout(@UserId() userId: number) {
		await this.service.logout(userId)
	}
}
