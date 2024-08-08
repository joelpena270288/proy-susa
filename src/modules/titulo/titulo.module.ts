import { Module } from '@nestjs/common';
import { TituloService } from './titulo.service';
import { TituloController } from './titulo.controller';
import { DatabaseModule } from '../../database/database.module';
import { ProyectoProviders } from '../proyecto/proyecto.providers';
import { TituloProviders } from './titulo.providers';
import { LogProviders } from '../log/log.providers';
@Module({
  imports: [DatabaseModule],
  controllers: [TituloController],
  providers: [TituloService,...TituloProviders,...ProyectoProviders,...LogProviders],
  exports:[TituloService]
})
export class TituloModule {}
