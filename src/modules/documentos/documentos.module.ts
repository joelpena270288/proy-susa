import { Module } from '@nestjs/common';
import { DocumentosService } from './documentos.service';
import { DocumentosController } from './documentos.controller';
import {DatabaseModule} from '../../database/database.module';
import { LogProviders } from '../log/log.providers';
import { DocumentoProviders } from './documentos.providers';
import { ProyectoProviders } from '../proyecto/proyecto.providers';
@Module({
  imports:[DatabaseModule],
  controllers: [DocumentosController],
  providers: [DocumentosService,...DocumentoProviders,...LogProviders,...ProyectoProviders],
  exports: [DocumentosService],
})
export class DocumentosModule {}
