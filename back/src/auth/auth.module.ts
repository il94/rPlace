import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { AuthRepository } from './auth.repository';

@Module({
	controllers: [ AuthController ],
	providers: [
		AuthService,
		PrismaService,
		JwtService,
		AuthRepository
	]
})
export class AuthModule {}