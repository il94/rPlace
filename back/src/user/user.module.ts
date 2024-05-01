import { Module } from '@nestjs/common';
import { PrismaService } from 'src/config/prisma.service';

@Module({
	providers: [ PrismaService ]
})
export class UserModule {}