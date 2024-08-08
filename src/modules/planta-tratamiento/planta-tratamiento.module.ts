import { Module } from '@nestjs/common';
import { PlantaTratamientoService } from './planta-tratamiento.service';
import { PlantaTratamientoController } from './planta-tratamiento.controller';

@Module({
  controllers: [PlantaTratamientoController],
  providers: [PlantaTratamientoService],
})
export class PlantaTratamientoModule {}
