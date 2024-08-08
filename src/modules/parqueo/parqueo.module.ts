import { Module } from '@nestjs/common';
import { ParqueoService } from './parqueo.service';
import { ParqueoController } from './parqueo.controller';

@Module({
  controllers: [ParqueoController],
  providers: [ParqueoService],
})
export class ParqueoModule {}
