import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserRepository {
	constructor(
		private prisma: PrismaService
	) {}

	async getUsername(userId: number): Promise<string> {
		const username = await this.prisma.user.findUnique({
			where: {
				id: userId
			},
			select: {
				username: true
			}
		})

		return (username.username)
	}
}