import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
	constructor(private AuthService: AuthService) {}

	@Post('signup')
	async signup(@Body() { username, password }, @Res() response: Response) {
		await this.AuthService.signup(username, password, response)
	}

	@Post('signin')
	async signin(@Body() { username, password }) {
		console.log(username, password)
	}

	@Get()
	@UseGuards(AuthGuard)
	async test() {
		console.log("TOKEN OK")
	}
}
