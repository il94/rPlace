import { Module } from '@nestjs/common';
import { GridService } from './grid.service';
import { GridController } from './grid.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { GridGateway } from './grid.gateway';

@Module({
	providers: [GridService, PrismaService, GridGateway],
	controllers: [GridController],
	exports: [GridGateway]
})

export class GridModule {}
