import { Module } from '@nestjs/common';
import { CisternaService } from './cisterna.service';
import { CisternaController } from './cisterna.controller';

@Module({
  controllers: [CisternaController],
  providers: [CisternaService],
})
export class CisternaModule {}
