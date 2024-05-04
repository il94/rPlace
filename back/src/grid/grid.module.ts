import { Module } from '@nestjs/common';
import { GridService } from './grid.service';
import { GridController } from './grid.controller';
import { PrismaService } from 'src/config/prisma.service';
import { GridRepository } from './grid.repository';
import { CellModule } from 'src/cell/cell.module';
import { CellService } from 'src/cell/cell.service';
import { AppGateway } from 'src/app.gateway';
import { CellRepository } from 'src/cell/cell.repository';
import { UserService } from 'src/user/user.service';
import { UserRepository } from 'src/user/user.repository';

@Module({
	providers: [
		GridService,
		PrismaService,
		GridRepository,
		CellService,
		AppGateway,
		CellRepository,
		UserService,
		UserRepository
	],
	controllers: [ GridController ],
	exports: [ GridService ]
})

export class GridModule {}
