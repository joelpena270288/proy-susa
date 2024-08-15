import { Module } from '@nestjs/common';
import { ApartamentoService } from './apartamento.service';
import { ApartamentoController } from './apartamento.controller';
import {DatabaseModule} from '../../database/database.module';
import { ApartamentoProviders } from './apartamento.providers';
import { LogProviders } from '../log/log.providers';
import { ProyectoProviders } from '../proyecto/proyecto.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [ApartamentoController],
  providers: [ApartamentoService,...ApartamentoProviders,...LogProviders,...ProyectoProviders],
  exports: [ApartamentoService]
})
export class ApartamentoModule {}
