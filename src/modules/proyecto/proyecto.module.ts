import { Module } from '@nestjs/common';
import { ProyectoService } from './proyecto.service';
import { ProyectoController } from './proyecto.controller';
import {DatabaseModule} from '../../database/database.module';
import { ProyectoProviders } from './proyecto.providers';

import { LogProviders } from '../log/log.providers';
import { ClienteProviders } from '../cliente/cliente.providers';
import { UbicacionProviders } from '../ubicacion/ubicacion.providers';


@Module({
  imports:[DatabaseModule],
  controllers: [ProyectoController],
  providers: [ProyectoService,...ProyectoProviders,...LogProviders,...ClienteProviders,...UbicacionProviders],
  exports:[ProyectoService],
})
export class ProyectoModule {}
