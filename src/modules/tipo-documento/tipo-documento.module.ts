import { Module } from '@nestjs/common';
import { TipoDocumentoService } from './tipo-documento.service';
import { TipoDocumentoController } from './tipo-documento.controller';
import { DatabaseModule } from '../../database/database.module';
import { LogProviders } from '../log/log.providers';
import { TipoDocumentoProviders } from './tipo-documento.providers';
@Module({
  imports: [DatabaseModule],
  controllers: [TipoDocumentoController],
  providers: [TipoDocumentoService,...TipoDocumentoProviders,...LogProviders],
  exports: [TipoDocumentoService],
})
export class TipoDocumentoModule {}
