import { Module } from '@nestjs/common';
import { ParqueoService } from './parqueo.service';
import { ParqueoController } from './parqueo.controller';
import {DatabaseModule} from '../../database/database.module';
import { ParqueoProviders } from './parqueo.providers';
import { LogProviders } from '../log/log.providers';
import { NivelProviders } from '../nivel/nivel.providers';

@Module({
  imports:[DatabaseModule],
  controllers: [ParqueoController],
  providers: [ParqueoService,...ParqueoProviders,...LogProviders,...NivelProviders],
  exports: [ParqueoService]
})
export class ParqueoModule {


}
