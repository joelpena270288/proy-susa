import { Module } from '@nestjs/common';
import { EdificioService } from './edificio.service';
import { EdificioController } from './edificio.controller';

@Module({
  controllers: [EdificioController],
  providers: [EdificioService],
})
export class EdificioModule {}
