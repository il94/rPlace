import { Module } from '@nestjs/common';
import { CellController } from './cell.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { CellService } from './cell.service';
import { GridGateway } from 'src/grid/grid.gateway';
import { CellRepository } from './cell.repository';
import { UserRepository } from 'src/user/user.repository';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthService } from 'src/auth/auth.service';
import { AuthRepository } from 'src/auth/auth.repository';

@Module({
	imports: [ JwtModule ],
	controllers: [ CellController ],
	providers: [
		PrismaService,
		CellService,
		GridGateway,
		CellRepository,
		UserRepository,
		JwtService,
		AuthService,
		AuthRepository
	]
})
export class CellModule {}
