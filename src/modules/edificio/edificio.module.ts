import { Module } from '@nestjs/common';
import { EdificioService } from './edificio.service';
import { EdificioController } from './edificio.controller';
import {DatabaseModule} from '../../database/database.module';
import { EdificioProviders } from './edificio.providers';
import { LogProviders } from '../log/log.providers';
import { ProyectoProviders } from '../proyecto/proyecto.providers';
import { ApartamentoProviders } from '../apartamento/apartamento.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [EdificioController],
  providers: [EdificioService,...EdificioProviders,...LogProviders,...ProyectoProviders,...ApartamentoProviders],
  exports: [EdificioService]
})
export class EdificioModule {}
