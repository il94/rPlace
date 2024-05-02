import { Module } from '@nestjs/common';
import { PrismaService } from 'src/config/prisma.service';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';

@Module({
	providers: [
		PrismaService,
		UserService,
		UserRepository
	]
})
export class UserModule {}