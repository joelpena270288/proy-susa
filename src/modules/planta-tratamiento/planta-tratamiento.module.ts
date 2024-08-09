import { Module } from '@nestjs/common';
import { PlantaTratamientoService } from './planta-tratamiento.service';
import { PlantaTratamientoController } from './planta-tratamiento.controller';
import { LogProviders } from '../log/log.providers';
import { DatabaseModule } from '../../database/database.module';
import { PlantaTratamientoProviders } from './planta-tratamiento.providers';
@Module({
  imports: [DatabaseModule],
  controllers: [PlantaTratamientoController],
  providers: [PlantaTratamientoService,...PlantaTratamientoProviders,...LogProviders],
  exports: [PlantaTratamientoService]
})
export class PlantaTratamientoModule {}
