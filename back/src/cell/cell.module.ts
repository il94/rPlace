import { Module } from '@nestjs/common';
import { CellController } from './cell.controller';
import { PrismaService } from 'src/config/prisma.service';
import { CellService } from './cell.service';
import { AppGateway } from 'src/app.gateway';
import { CellRepository } from './cell.repository';
import { UserService } from 'src/user/user.service';
import { GridModule } from 'src/grid/grid.module';
import { UserRepository } from 'src/user/user.repository';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from 'src/auth/auth.service';

@Module({
	controllers: [ CellController ],
	providers: [
		CellService,
		UserService,
		CellRepository,
		PrismaService,
		AppGateway,
		UserRepository,
		JwtService,
		AuthService
	],
	exports: [ CellService ]
})

export class CellModule {}
