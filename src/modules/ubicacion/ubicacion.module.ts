import { Module } from '@nestjs/common';
import { UbicacionService } from './ubicacion.service';
import { UbicacionController } from './ubicacion.controller';
import { DatabaseModule } from '../../database/database.module';
import { UbicacionProviders } from './ubicacion.providers';
import { LogProviders } from '../log/log.providers';
@Module({
  imports: [DatabaseModule],
  controllers: [UbicacionController],
  providers: [UbicacionService,...UbicacionProviders,...LogProviders],
  exports: [UbicacionService]
})
export class UbicacionModule {}
