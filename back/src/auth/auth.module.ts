import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaService } from 'src/config/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { UserRepository } from 'src/user/user.repository';

@Module({
	controllers: [ AuthController ],
	providers: [
		AuthService,
		UserService,
		JwtService,
		PrismaService,
		UserRepository
	],
	exports: [ AuthModule ]
})

export class AuthModule {}