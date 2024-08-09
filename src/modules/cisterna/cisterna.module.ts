import { Module } from '@nestjs/common';
import { CisternaService } from './cisterna.service';
import { CisternaController } from './cisterna.controller';
import {DatabaseModule} from '../../database/database.module';
import { CisternaProviders } from './cisterna.providers';
import { LogProviders } from '../log/log.providers';
@Module({
  imports:[DatabaseModule],
  controllers: [CisternaController],
  providers: [CisternaService,...CisternaProviders,...LogProviders],
  exports: [CisternaService]
})
export class CisternaModule {}
