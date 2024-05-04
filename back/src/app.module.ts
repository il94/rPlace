import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GridModule } from './grid/grid.module';
import { PrismaService } from './config/prisma.service';
import { CellService } from './cell/cell.service';
import { CellModule } from './cell/cell.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { UserService } from './user/user.service';
import { AppGateway } from './app.gateway';
import { CellRepository } from './cell/cell.repository';
import { UserRepository } from './user/user.repository';

@Module({
	imports: [
		GridModule,
		CellModule,
		AuthModule,
		UserModule
	],
	controllers: [ AppController ],
	providers: [
		AppService,
		PrismaService,
		CellService,
		UserService,
		AppGateway,
		CellRepository,
		UserRepository
	],
	exports: [ AppGateway ]
})

export class AppModule {}
