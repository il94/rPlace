import { Module } from '@nestjs/common';
import { PrismaService } from 'src/config/prisma.service';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { UserController } from './user.controller';

@Module({
	providers: [
		PrismaService,
		UserService,
		UserRepository
	],
	exports: [ UserService ],
	controllers: [UserController]
})

export class UserModule {}