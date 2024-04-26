import { Module } from '@nestjs/common';
import { CellController } from './cell.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { CellService } from './cell.service';

@Module({
  controllers: [CellController],
  providers: [PrismaService, CellService]
})
export class CellModule {}
