import { Module } from '@nestjs/common';
import { ContratoService } from './contrato.service';
import { ContratoController } from './contrato.controller';
import { DatabaseModule } from '../../database/database.module';
import { ProyectoProviders } from '../proyecto/proyecto.providers';
import { ContratoProviders } from './contrato.providers';
import { LogProviders } from '../log/log.providers';
@Module({
  imports: [DatabaseModule],
  controllers: [ContratoController],
  providers: [ContratoService,...ProyectoProviders,...ContratoProviders,...LogProviders],
  exports: [ContratoService]
})
export class ContratoModule {}
