import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GridModule } from './grid/grid.module';
import { PrismaService } from './prisma/prisma.service';
import { CellService } from './cell/cell.service';
import { CellModule } from './cell/cell.module';
import { AuthModule } from './auth/auth.module';

@Module({
	imports: [
		GridModule,
		CellModule,
		AuthModule
	],
	controllers: [ AppController ],
	providers: [
		AppService,
		PrismaService,
		CellService
	],
})

export class AppModule {}
