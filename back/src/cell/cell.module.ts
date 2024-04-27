import { Module } from '@nestjs/common';
import { CellController } from './cell.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { CellService } from './cell.service';
import { GridGateway } from 'src/grid/grid.gateway';

@Module({
  controllers: [CellController],
  providers: [PrismaService, CellService, GridGateway]
})
export class CellModule {}
