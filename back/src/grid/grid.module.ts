import { Module } from '@nestjs/common';
import { GridService } from './grid.service';
import { GridController } from './grid.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
	providers: [GridService, PrismaService],
	controllers: [GridController]
})
export class GridModule {}
